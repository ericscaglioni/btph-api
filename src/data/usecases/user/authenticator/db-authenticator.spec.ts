import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { mockLoadUserByEmailRepository } from '@/data/test'
import { mockAuthentication } from '@/domain/test'
import { DbAuthenticator } from './db-authenticator'

type SutTypes = {
  sut: DbAuthenticator
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const sut = new DbAuthenticator(loadUserByEmailRepositoryStub)
  return {
    sut,
    loadUserByEmailRepositoryStub
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
})
