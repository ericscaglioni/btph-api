import { AddMessage, AddMessageParams } from '@/domain/usecases/message/add-message'

export const mockAddMessage = (): AddMessage => {
  class AddMessageStub implements AddMessage {
    async add (message: AddMessageParams): Promise<void> {}
  }
  return new AddMessageStub()
}
