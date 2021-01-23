import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => new LogMongoRepository()

let errorCollection: Collection

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error_stack')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
