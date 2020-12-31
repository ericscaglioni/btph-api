import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import faker from 'faker'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'

const mockMessage = (): any => ({
  name: faker.name.findName(),
  message: faker.lorem.paragraphs(4)
})

let messageCollection: Collection

describe('Message routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    messageCollection = await MongoHelper.getCollection('messages')
    await messageCollection.deleteMany({})
  })

  describe('POST /messages', () => {
    it('Should return 400 if name is not provided', async () => {
      await request(app)
        .post('/api/messages')
        .send({
          message: faker.lorem.paragraphs(4)
        })
        .expect(400)
    })

    it('Should return 204 on success', async () => {
      const mockedMessage = mockMessage()
      await request(app)
        .post('/api/messages')
        .send(mockedMessage)
        .expect(204)
      const message = await messageCollection.findOne({ name: mockedMessage.name })
      expect(message).toBeTruthy()
    })
  })
})
