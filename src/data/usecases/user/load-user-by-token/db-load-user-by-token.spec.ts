import { mockDecrypter, mockLoadUserByIdRepository } from '@/data/test'
import faker from 'faker'
import { DbLoadUserByToken } from './db-load-user-by-token'
import { Decrypter, LoadUserByIdRepository } from './db-load-user-by-token-protocols'

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

describe('Load user by token usescase', () => {
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

  it('Should return null if LoadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const user = await sut.loadByToken(faker.random.uuid())
    expect(user).toBeNull()
  })

  it('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.loadByToken(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an user on success', async () => {
    const { sut } = makeSut()
    const user = await sut.loadByToken(faker.random.uuid())
    expect(user).toBeTruthy()
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
  })
})
