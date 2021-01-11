import faker from 'faker'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async verify (): Promise<object> {
    return {
      id: 'any_user_id'
    }
  }
}))

const randomSecret = faker.random.word()

const makeSut = (): JwtAdapter => new JwtAdapter(randomSecret)

describe('JWT Adapter', () => {
  describe('verify', () => {
    it('Should call jwt verify with correct data', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      const token = faker.random.uuid()
      await sut.decrypt(token)
      expect(verifySpy).toHaveBeenCalledWith(token, randomSecret)
    })
  })
})
