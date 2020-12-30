import { AddMessage, AddMessageParams, AddMessageRepository } from './db-add-message-protocols'

export class DbAddMessage implements AddMessage {
  constructor (private readonly addMessageRepository: AddMessageRepository) {}

  async add (message: AddMessageParams): Promise<void> {
    await this.addMessageRepository.add(message)
  }
}
