import { AddUser } from '@/domain/usecases/user/add-user'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockAddUser, mockValidation } from '@/presentation/test'
import faker from 'faker'
import { AddUserController } from './add-user-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password()
  }
})

type SutTypes = {
  sut: AddUserController
  validationStub: Validation
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addUserStub = mockAddUser()
  const sut = new AddUserController(validationStub, addUserStub)
  return {
    sut,
    validationStub,
    addUserStub
  }
}

describe('Add user Controller', () => {
  it('Should call Validation with correct data', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  it('Should call AddUser with correct data', async () => {
    const { sut, addUserStub } = makeSut()
    const addSpy = jest.spyOn(addUserStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })
})
