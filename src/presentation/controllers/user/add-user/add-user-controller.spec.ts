import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import faker from 'faker'
import { AddUserController } from './add-user-controller'

type SutTypes = {
  sut: AddUserController
}

const makeSut = (): SutTypes => {
  const sut = new AddUserController()
  return {
    sut
  }
}

describe('Add user Controller', () => {
  it('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordConfirmation: faker.internet.password()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
