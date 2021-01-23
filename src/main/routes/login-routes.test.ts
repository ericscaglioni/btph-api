import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

const insertUser = async (): Promise<void> => {
  const salt = 12
  const hashedPassword = await hash('123', salt)
  await userCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: hashedPassword
  })
}

let userCollection: Collection

describe('Login routes', () => {
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

  describe('POST /login', () => {
    it('Should return 200 on success', async () => {
      await insertUser()
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
