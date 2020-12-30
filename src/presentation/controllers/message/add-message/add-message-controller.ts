import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddMessage } from './add-message-controller-protocols'

export class AddMessageController implements Controller {
  constructor (private readonly addMessage: AddMessage) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, message } = httpRequest.body
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!message) {
      return badRequest(new MissingParamError('message'))
    }
    await this.addMessage.add({
      name,
      message,
      date: new Date(),
      read: false
    })
    return null
  }
}
