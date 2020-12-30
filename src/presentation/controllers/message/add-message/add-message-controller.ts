import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from './add-message-controller-protocols'

export class AddMessageController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, message } = httpRequest.body
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!message) {
      return badRequest(new MissingParamError('message'))
    }
    return null
  }
}
