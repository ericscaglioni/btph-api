import { unauthorized } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

type SutTypes = {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('Auth Middleware', () => {
  it('Should return 401 if x-access-token is not provided on headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized())
  })
})
