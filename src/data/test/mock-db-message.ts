import { AddMessageRepository, LoadMessagesRepository } from '@/data/protocols/db/message'
import { MessageModel } from '@/domain/models/message'
import { mockMessageModels } from '@/domain/test/mock-message'
import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'

export const mockAddMessageRepository = (): AddMessageRepository => {
  class AddMessageRepositoryStub implements AddMessageRepository {
    async add (message: AddMessageParams): Promise<void> { }
  }
  return new AddMessageRepositoryStub()
}

export const mockLoadMessagesRepository = (): LoadMessagesRepository => {
  class LoadMessagesRepositoryStub implements LoadMessagesRepository {
    async load (message: LoadMessagesParams): Promise<MessageModel[]> {
      return mockMessageModels()
    }
  }
  return new LoadMessagesRepositoryStub()
}
