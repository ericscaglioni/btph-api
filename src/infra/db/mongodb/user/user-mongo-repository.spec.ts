import { UserMongoRepository } from './user-mongo-repository'
import faker from 'faker'

const makeSut = (): UserMongoRepository => new UserMongoRepository()

describe('User Mongo Repository', () => {
  describe('loadById()', () => {
    it('Should return null if user doesn\'t exist', async () => {
      const sut = makeSut()
      const user = await sut.loadById(faker.random.uuid())
      expect(user).toBeNull()
    })
  })
})
