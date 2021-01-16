import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadMessages } from './load-messages-controller-protocols'

export class LoadMessagesController implements Controller {
  constructor (private readonly loadMessages: LoadMessages) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = this.makeLoadMessagesParams(httpRequest.query)
      const messages = await this.loadMessages.load(params)
      return messages.length ? ok(messages) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  private makeLoadMessagesParams (query: any): LoadMessagesParams {
    const {
      initialDate,
      finalDate,
      read = false,
      limit = 10,
      offset = 0
    } = query
    const newFinalDate = new Date(finalDate)
    newFinalDate.setHours(23, 59, 59)
    return {
      initialDate: new Date(initialDate).toISOString(),
      finalDate: newFinalDate.toISOString(),
      read,
      pagination: { limit, offset }
    }
  }
}
