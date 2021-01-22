import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { mockLoadUserByEmailRepository } from '@/data/test'
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
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const sut = new DbAuthentication(loadUserByEmailRepositoryStub)
  return {
    sut,
    loadUserByEmailRepositoryStub
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
})
