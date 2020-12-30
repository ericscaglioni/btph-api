import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import faker from 'faker'
import { AddMessageController } from './add-message-controller'
import { HttpRequest } from './add-message-controller-protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    message: faker.lorem.paragraphs(3)
  }
})

type SutTypes = {
  sut: AddMessageController
}

const makeSut = (): SutTypes => {
  const sut = new AddMessageController()
  return {
    sut
  }
}

describe('Add Message Controller', () => {
  it('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
