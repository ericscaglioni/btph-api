import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { AddMessage, Controller, HttpRequest, HttpResponse } from './add-message-controller-protocols'

export class AddMessageController implements Controller {
  constructor (private readonly addMessage: AddMessage) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
