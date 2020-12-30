
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAddMessage } from '@/presentation/test'
import faker from 'faker'
import MockDate from 'mockdate'
import { AddMessageController } from './add-message-controller'
import { AddMessage, HttpRequest } from './add-message-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    message: faker.lorem.paragraphs(3)
  }
})

type SutTypes = {
  sut: AddMessageController
  addMessageStub: AddMessage
}

const makeSut = (): SutTypes => {
  const addMessageStub = mockAddMessage()
  const sut = new AddMessageController(addMessageStub)
  return {
    sut,
    addMessageStub
  }
}

describe('Add Message Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        message: faker.lorem.paragraphs(3)
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  it('Should return 400 if message is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: faker.name.findName()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')))
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
})
