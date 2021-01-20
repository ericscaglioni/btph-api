import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import config from '@/main/config/environment'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import faker from 'faker'

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

let userCollection: Collection

describe('User routes', () => {
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

  describe('POST /users', () => {
    it('Should return 401 if no access token is provided', async () => {
      await request(app)
        .post('/api/users')
        .expect(401)
    })

    it('Should return 400 if name is not provided', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
          passwordConfirmation: faker.internet.password()
        })
        .expect(400)
    })

    it('Should return 400 if password and passwordConfirmation does not match', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          passwordConfirmation: faker.internet.password()
        })
        .expect(400)
    })

    it('Should return 400 if email is not valid', async () => {
      const accessToken = await makeAccessToken()
      const password = faker.internet.password()
      await request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          name: faker.name.firstName(),
          email: 'invalid_email',
          password,
          passwordConfirmation: password
        })
        .expect(400)
    })
  })
})
