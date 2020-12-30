import { mockAddMessageParams } from '@/domain/test'
import { Collection } from 'mongodb'
import { MongoHelper } from './../helpers/mongo-helper'
import { MessageMongoRepository } from './message-mongo-repository'

let messageCollection: Collection

describe('Message Mongo Repository', () => {
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

  describe('add()', () => {
    it('Should add message on success', async () => {
      const sut = new MessageMongoRepository()
      const addMessageParams = mockAddMessageParams()
      await sut.add({
        ...addMessageParams
      })
      const message = await messageCollection.findOne({ name: addMessageParams.name })
      expect(message).toBeTruthy()
      expect(message._id).toBeTruthy()
      expect(message.name).toBe(addMessageParams.name)
      expect(message.message).toBe(addMessageParams.message)
      expect(message).toHaveProperty('date')
      expect(message.read).toBeFalsy()
    })
  })
})
