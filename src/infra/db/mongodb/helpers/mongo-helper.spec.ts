import { MongoHelper as sut } from './mongo-helper'
describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect when connection is down', async () => {
    let messageCollection = await sut.getCollection('messages')
    expect(messageCollection).toBeTruthy()
    await sut.disconnect()
    messageCollection = await sut.getCollection('messages')
    expect(messageCollection).toBeTruthy()
  })
})
