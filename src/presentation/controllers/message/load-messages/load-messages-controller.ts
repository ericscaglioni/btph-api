import { LoadMessages } from '@/domain/usecases/message/load-messages'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMessagesController implements Controller {
  constructor (private readonly loadMessages: LoadMessages) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        initialDate,
        finalDate,
        read,
        limit,
        offset
      } = httpRequest.query
      const pagination = { limit, offset }
      await this.loadMessages.load({
        initialDate,
        finalDate,
        read,
        pagination
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
