import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { mockEncrypter, mockHashComparer, mockLoadUserByEmailRepository } from '@/data/test'
import { AuthenticationParams } from '@/domain/usecases/user/authentication'
import faker from 'faker'
import { DbAuthentication } from './db-authentication'

const email = faker.internet.email()
const password = faker.internet.password()

const mockAuthenticationParams = (): AuthenticationParams => ({
  email,
  password
})

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  }
}

describe('Authentication usecase', () => {
  it('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(loadByEmailSpy).toHaveBeenCalledWith(params.email)
  })

  it('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const authenticatedUser = await sut.auth(mockAuthenticationParams())
    expect(authenticatedUser).toBeNull()
  })

  it('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call HashComparer with correct data', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(compareSpy).toHaveBeenCalledWith(params.password, 'hashed_password')
  })

  it('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const authenticatedUser = await sut.auth(mockAuthenticationParams())
    expect(authenticatedUser).toBeNull()
  })

  it('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should call Encrypter with correct user id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an authenticated user on success', async () => {
    const { sut } = makeSut()
    const params = mockAuthenticationParams()
    const authenticatedUser = await sut.auth(params)
    expect(authenticatedUser).toEqual({
      accessToken: 'any_token',
      name: expect.any(String),
      email: expect.any(String)
    })
  })
})
