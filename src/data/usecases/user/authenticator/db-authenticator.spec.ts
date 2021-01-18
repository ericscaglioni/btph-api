import { HashComparer } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { mockHashComparer, mockLoadUserByEmailRepository } from '@/data/test'
import { mockAuthentication } from '@/domain/test'
import { DbAuthenticator } from './db-authenticator'

type SutTypes = {
  sut: DbAuthenticator
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const sut = new DbAuthenticator(loadUserByEmailRepositoryStub, hashComparerStub)
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub
  }
}

describe('Authenticator usecase', () => {
  it('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    expect(loadSpy).toHaveBeenCalledWith(authParams.email)
  })

  it('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const authenticatedUser = await sut.auth(mockAuthentication())
    expect(authenticatedUser).toBeNull()
  })

  it('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    expect(compareSpy).toHaveBeenCalledWith(authParams.password, 'hashed_password')
  })

  it('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })
})
