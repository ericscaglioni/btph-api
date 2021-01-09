import { Decrypter } from '@/data/protocols/criptography'
import { LoadUserByIdRepository } from '@/data/protocols/db/user'
import { mockDecrypter, mockLoadUserByIdRepository } from '@/data/test'
import faker from 'faker'
import { DbLoadUserByToken } from './db-load-user-by-token'

type SutTypes = {
  sut: DbLoadUserByToken
  decrypterStub: Decrypter
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository()
  const sut = new DbLoadUserByToken(decrypterStub, loadUserByIdRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadUserByIdRepositoryStub
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

  it('Should call LoadUserByIdRepository with correct id', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.loadByToken(faker.random.uuid())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_user_id')
  })
})
