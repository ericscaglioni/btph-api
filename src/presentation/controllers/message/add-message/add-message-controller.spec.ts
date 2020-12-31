import { noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAddMessage, mockValidation } from '@/presentation/test'
import faker from 'faker'
import MockDate from 'mockdate'
import { AddMessageController } from './add-message-controller'
import { AddMessage, HttpRequest, Validation } from './add-message-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    message: faker.lorem.paragraphs(3)
  }
})

type SutTypes = {
  sut: AddMessageController
  addMessageStub: AddMessage
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addMessageStub = mockAddMessage()
  const validationStub = mockValidation()
  const sut = new AddMessageController(addMessageStub, validationStub)
  return {
    sut,
    addMessageStub,
    validationStub
  }
}

describe('Add Message Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct data', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should call AddMessage with correct data', async () => {
    const { sut, addMessageStub } = makeSut()
    const addSpy = jest.spyOn(addMessageStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      message: httpRequest.body.message,
      date: new Date(),
      read: false
    })
  })

  it('Should return 500 if AddMessage throws', async () => {
    const { sut, addMessageStub } = makeSut()
    jest.spyOn(addMessageStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
