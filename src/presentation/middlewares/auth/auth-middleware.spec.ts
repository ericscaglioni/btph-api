import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'
import { unauthorized } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadUserByToken } from '@/presentation/test'
import { AuthMiddleware } from './auth-middleware'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': faker.random.uuid()
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadUserByTokenStub: LoadUserByToken
}

const makeSut = (): SutTypes => {
  const loadUserByTokenStub = mockLoadUserByToken()
  const sut = new AuthMiddleware(loadUserByTokenStub)
  return {
    sut,
    loadUserByTokenStub
  }
}

describe('Auth Middleware', () => {
  it('Should return 401 if x-access-token is not provided on headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should call LoadUserByToken with correct accessToken', async () => {
    const { sut, loadUserByTokenStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadUserByTokenStub, 'loadByToken')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadByTokenSpy).toHaveBeenCalledWith(httpRequest.headers['x-access-token'])
  })
})
