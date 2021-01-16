import { mockAddMessageParams } from '@/domain/test'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoHelper } from './../helpers/mongo-helper'
import { MessageMongoRepository } from './message-mongo-repository'
import faker from 'faker'

type DateRange = {
  initialDate: string
  finalDate: string
}

const makeDateRange = (): DateRange => {
  const initialDate = new Date()
  const finalDate = new Date()
  finalDate.setHours(23, 59, 59)
  return {
    initialDate: initialDate.toISOString(),
    finalDate: finalDate.toISOString()
  }
}

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
    it('Should return messages based on limit', async () => {
      await messageCollection.insertMany([{
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }])
      const sut = makeSut()
      const { initialDate, finalDate } = makeDateRange()
      const loadMessageParams = {
        initialDate,
        finalDate,
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
      await messageCollection.insertMany([{
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }])
      const sut = makeSut()
      const { initialDate, finalDate } = makeDateRange()
      const loadMessageParams = {
        initialDate,
        finalDate,
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
      const readMessage = {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: true,
        date: new Date()
      }
      await messageCollection.insertMany([{
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, {
        name: faker.name.findName(),
        message: faker.lorem.paragraphs(3),
        read: false,
        date: new Date()
      }, readMessage])
      const sut = makeSut()
      const { initialDate, finalDate } = makeDateRange()
      const loadMessageParams = {
        initialDate,
        finalDate,
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
        initialDate: new Date('2021-01-01').toISOString(),
        finalDate: new Date('2021-01-08').toISOString(),
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
