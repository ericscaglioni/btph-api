import { noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { AddMessage, Controller, HttpRequest, HttpResponse, Validation } from './add-message-controller-protocols'

export class AddMessageController implements Controller {
  constructor (
    private readonly addMessage: AddMessage,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const { name, message } = httpRequest.body
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
