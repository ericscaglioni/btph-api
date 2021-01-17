import { HttpRequest, Validation } from '@/presentation/protocols'
import { mockValidation } from '@/presentation/test'
import faker from 'faker'
import { AddUserController } from './add-user-controller'

const mockRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password()
  }
})

type SutTypes = {
  sut: AddUserController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AddUserController(validationStub)
  return {
    sut,
    validationStub
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
})
