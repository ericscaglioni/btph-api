import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Controller, HttpRequest, HttpResponse } from './add-message-controller-protocols'

export class AddMessageController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body
    if (!name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    return null
  }
}
