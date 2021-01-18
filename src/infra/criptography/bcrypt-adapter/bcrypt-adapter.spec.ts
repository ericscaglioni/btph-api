import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
    it('Should call compare with correct data', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
  })
})
