import { AddMessageRepository } from '../../../protocols/db/message'
import { AddMessageParams } from './../../../../domain/usecases/message/add-message'
import { DbAddMessage } from './db-add-message'

describe('DbAddMessage usecase', () => {
  it('Should call AddMessageRepository with correct data', async () => {
    class AddMessageRepositoryStub implements AddMessageRepository {
      async add (message: AddMessageParams): Promise<void> {}
    }
    const addMessageRepositoryStub = new AddMessageRepositoryStub()
    const sut = new DbAddMessage(addMessageRepositoryStub)
    const addSpy = jest.spyOn(addMessageRepositoryStub, 'add')
    const addMessageParams = {
      name: 'any_name',
      message: 'any_message'
    }
    await sut.add(addMessageParams)
    expect(addSpy).toHaveBeenCalledWith(addMessageParams)
  })
})
