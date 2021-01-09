import { mockAddMessageParams } from '@/domain/test'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoHelper } from './../helpers/mongo-helper'
import { MessageMongoRepository } from './message-mongo-repository'

let messageCollection: Collection

const makeSut = (): MessageMongoRepository => new MessageMongoRepository()

describe('Message Mongo Repository', () => {
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
  })

  describe('add()', () => {
    it('Should add message on success', async () => {
      const sut = makeSut()
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

  describe('load()', () => {
    it.only('Should return messages based on limit', async () => {
      const addMessageModels = [mockAddMessageParams(), mockAddMessageParams(), mockAddMessageParams()]
      await messageCollection.insertMany(addMessageModels)
      const sut = makeSut()
      const loadMessageParams = {
        initialDate: new Date(),
        finalDate: new Date(),
        read: false,
        pagination: {
          limit: 2,
          offset: 0
        }
      }
      const messages = await sut.load(loadMessageParams)
      expect(messages).toBeTruthy()
      expect(messages).toHaveLength(2)
    })

    it('Should return messages based on limit and offset', async () => {
      const addMessageModels = [mockAddMessageParams(), mockAddMessageParams(), mockAddMessageParams()]
      await messageCollection.insertMany(addMessageModels)
      const sut = makeSut()
      const loadMessageParams = {
        initialDate: new Date(),
        finalDate: new Date(),
        read: false,
        pagination: {
          limit: 2,
          offset: 2
        }
      }
      const messages = await sut.load(loadMessageParams)
      expect(messages).toBeTruthy()
      expect(messages).toHaveLength(1)
    })

    it('Should return read messages', async () => {
      const readMessage = mockAddMessageParams()
      readMessage.read = true
      const addMessageModels = [mockAddMessageParams(), readMessage, mockAddMessageParams()]
      await messageCollection.insertMany(addMessageModels)
      const sut = makeSut()
      const loadMessageParams = {
        initialDate: new Date(),
        finalDate: new Date(),
        read: true,
        pagination: {
          limit: 10,
          offset: 0
        }
      }
      const messages = await sut.load(loadMessageParams)
      expect(messages).toBeTruthy()
      expect(messages).toHaveLength(1)
      expect(messages[0]).toEqual(readMessage)
    })

    it('Should return an empty array if there is no message based on filters', async () => {
      const readMessage = mockAddMessageParams()
      readMessage.read = true
      const addMessageModels = [readMessage]
      await messageCollection.insertMany(addMessageModels)
      const sut = makeSut()
      const loadMessageParams = {
        initialDate: new Date('2021-01-01'),
        finalDate: new Date('2021-01-08'),
        read: false,
        pagination: {
          limit: 10,
          offset: 0
        }
      }
      const messages = await sut.load(loadMessageParams)
      expect(messages).toBeTruthy()
      expect(messages).toHaveLength(0)
    })
  })
})
