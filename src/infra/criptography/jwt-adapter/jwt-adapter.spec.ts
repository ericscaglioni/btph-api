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

const token = faker.random.uuid()

const randomSecret = faker.random.word()

const makeSut = (): JwtAdapter => new JwtAdapter(randomSecret)

describe('JWT Adapter', () => {
  describe('verify', () => {
    it('Should call jwt verify with correct data', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(token)
      expect(verifySpy).toHaveBeenCalledWith(token, randomSecret)
    })

    it('Should throw if jwt verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt(token)
      await expect(promise).rejects.toThrow()
    })

    it('Should return an userId on success', async () => {
      const sut = makeSut()
      const userId = await sut.decrypt(token)
      expect(userId).toBe('any_user_id')
    })
  })
})
