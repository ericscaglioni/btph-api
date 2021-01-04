import { MessageModel } from '@/domain/models/message'
import { mockMessageModels } from '@/domain/test'
import { AddMessage, AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessages, LoadMessagesParams } from '@/domain/usecases/message/load-messages'

export const mockAddMessage = (): AddMessage => {
  class AddMessageStub implements AddMessage {
    async add (message: AddMessageParams): Promise<void> {}
  }
  return new AddMessageStub()
}

export const mockLoadMessages = (): LoadMessages => {
  class LoadMessagesStub implements LoadMessages {
    async load (data: LoadMessagesParams): Promise<MessageModel[]> {
      return mockMessageModels()
    }
  }
  return new LoadMessagesStub()
}
