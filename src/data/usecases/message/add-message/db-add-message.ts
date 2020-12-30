import { AddMessageRepository } from '@/data/protocols/db/message'
import { AddMessage, AddMessageParams } from '@/domain/usecases/message/add-message'

export class DbAddMessage implements AddMessage {
  constructor (private readonly addMessageRepository: AddMessageRepository) {}

  async add (message: AddMessageParams): Promise<void> {
    await this.addMessageRepository.add(message)
  }
}
