import faker from 'faker'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { UserMongoRepository } from './user-mongo-repository'

let userCollection: Collection

const makeSut = (): UserMongoRepository => new UserMongoRepository()

describe('User Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('loadById()', () => {
    it('Should return an user on success', async () => {
      const userParams = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      const res = await userCollection.insertOne(userParams)
      const userId = res.ops[0]._id
      const sut = makeSut()
      const user = await sut.loadById(userId)
      expect(user).toEqual({
        id: userId,
        name: userParams.name,
        email: userParams.email,
        password: userParams.password
      })
    })
  })
})
