import { AddMessageParams } from '../../domain/usecases/message/add-message'
import { AddMessageRepository } from './../protocols/db/message'

export const mockAddMessageRepository = (): AddMessageRepository => {
  class AddMessageRepositoryStub implements AddMessageRepository {
    async add (message: AddMessageParams): Promise<void> { }
  }
  return new AddMessageRepositoryStub()
}
