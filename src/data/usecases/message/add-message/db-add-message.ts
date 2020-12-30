import { AddMessage, AddMessageParams } from './../../../../domain/usecases/message/add-message'
import { AddMessageRepository } from './../../../protocols/db/message'

export class DbAddMessage implements AddMessage {
  constructor (private readonly addMessageRepository: AddMessageRepository) {}

  async add (message: AddMessageParams): Promise<void> {
    await this.addMessageRepository.add(message)
  }
}
