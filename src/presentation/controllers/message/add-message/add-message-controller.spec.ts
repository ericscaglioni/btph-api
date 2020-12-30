import { MissingParamError } from '@/presentation/errors'
import faker from 'faker'
import { AddMessageController } from './add-message-controller'

describe('Add Message Controller', () => {
  it('Should return 400 if name is not provided', async () => {
    const sut = new AddMessageController()
    const httpRequest = {
      body: {
        message: faker.lorem.paragraphs(3)
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new MissingParamError('name')
    })
  })
})
