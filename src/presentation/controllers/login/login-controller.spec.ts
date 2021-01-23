import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockValidation } from '@/presentation/test'
import faker from 'faker'
import { LoginController } from './login-controller'

const email = faker.internet.email()
const password = faker.internet.password()

const mockRequest = (): HttpRequest => ({
  body: {
    email,
    password
  }
})

type SutTypes = {
  sut: LoginController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Login Controller', () => {
  it('Should call Validation with correct data', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
