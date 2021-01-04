import { LoadMessagesRepository } from '@/data/protocols/db/message/load-messages-repository'
import { MessageModel } from '@/domain/models/message'
import { LoadMessages, LoadMessagesParams } from '@/domain/usecases/message/load-messages'

export class DbLoadMessages implements LoadMessages {
  constructor (private readonly loadMessagesRepository: LoadMessagesRepository) {}

  async load (data: LoadMessagesParams): Promise<MessageModel[]> {
    await this.loadMessagesRepository.load(data)
    return null
  }
}
