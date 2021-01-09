import { Decrypter } from '@/data/protocols/criptography'
import { mockDecrypter } from '@/data/test'
import faker from 'faker'
import { DbLoadUserByToken } from './db-load-user-by-token'

type SutTypes = {
  sut: DbLoadUserByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const sut = new DbLoadUserByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadUserByToken usescase', () => {
  it('Should call Decrypter with correct token', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const userId = faker.random.uuid()
    await sut.loadByToken(userId)
    expect(decryptSpy).toHaveBeenCalledWith(userId)
  })

  it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)
    const user = await sut.loadByToken(faker.random.uuid())
    expect(user).toBeNull()
  })

  it('Should return null if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const user = await sut.loadByToken(faker.random.uuid())
    expect(user).toBeNull()
  })
})
