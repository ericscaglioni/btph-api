import { LoadMessages, LoadMessagesParams, LoadMessagesRepository, MessageModel } from './db-load-messages-protocols'

export class DbLoadMessages implements LoadMessages {
  constructor (private readonly loadMessagesRepository: LoadMessagesRepository) {}

  async load (data: LoadMessagesParams): Promise<MessageModel[]> {
    const messages = await this.loadMessagesRepository.load(data)
    return messages
  }
}
