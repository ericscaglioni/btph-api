import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import config from '@/main/config/environment'
import faker from 'faker'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import MockDate from 'mockdate'

const makeAccessToken = async (): Promise<string> => {
  const res = await userCollection.insertOne({
    name: 'Eric',
    email: 'ericsf34@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, config.jwtSecret)
  return accessToken
}

const insertMessages = async (): Promise<void> => {
  const finalDate = new Date()
  finalDate.setDate(finalDate.getDate() + 8)
  await messageCollection.insertMany([{
    name: faker.name.findName(),
    message: faker.lorem.paragraphs(3),
    read: false,
    date: new Date().toISOString()
  }, {
    name: faker.name.findName(),
    message: faker.lorem.paragraphs(3),
    read: false,
    date: new Date(finalDate).toISOString()
  }, {
    name: faker.name.findName(),
    message: faker.lorem.paragraphs(3),
    read: false,
    date: new Date().toISOString()
  }])
}

const mockMessage = (): any => ({
  name: faker.name.findName(),
  message: faker.lorem.paragraphs(4)
})

let messageCollection: Collection
let userCollection: Collection

describe('Message routes', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    messageCollection = await MongoHelper.getCollection('messages')
    await messageCollection.deleteMany({})
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
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

  describe('GET /messages', () => {
    it('Should return 401 on load messages without access token', async () => {
      await request(app)
        .get('/api/messages')
        .expect(401)
    })

    it('Should return 200 on success', async () => {
      const initialDate = new Date()
      const finalDate = new Date()
      finalDate.setDate(finalDate.getDate() + 7)

      const accessToken = await makeAccessToken()
      await insertMessages()
      const httpResponse = await request(app)
        .get('/api/messages')
        .query({ initialDate, finalDate })
        .set('x-access-token', accessToken)
        .expect(200)
      expect(httpResponse.body).toHaveLength(2)
    })

    it('Should return 204 on success without messages', async () => {
      const initialDate = new Date()
      const finalDate = new Date()
      finalDate.setDate(finalDate.getDate() + 7)

      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/messages')
        .query({ initialDate, finalDate })
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
