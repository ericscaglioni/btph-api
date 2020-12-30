import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import faker from 'faker'
import { AddMessageController } from './add-message-controller'

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
})
