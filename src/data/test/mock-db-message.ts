import { AddMessageRepository } from '@/data/protocols/db/message'
import { AddMessageParams } from '@/domain/usecases/message/add-message'

export const mockAddMessageRepository = (): AddMessageRepository => {
  class AddMessageRepositoryStub implements AddMessageRepository {
    async add (message: AddMessageParams): Promise<void> { }
  }
  return new AddMessageRepositoryStub()
}
