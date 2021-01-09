import MockDate from 'mockdate'
import { mockAddMessageRepository } from '@/data/test'
import { mockAddMessageParams } from '@/domain/test'
import { DbAddMessage } from './db-add-message'
import { AddMessageRepository } from './db-add-message-protocols'

type SutTypes = {
  sut: DbAddMessage
  addMessageRepositoryStub: AddMessageRepository
}

const makeSut = (): SutTypes => {
  const addMessageRepositoryStub = mockAddMessageRepository()
  const sut = new DbAddMessage(addMessageRepositoryStub)
  return {
    sut,
    addMessageRepositoryStub
  }
}

describe('DbAddMessage usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call AddMessageRepository with correct data', async () => {
    const { sut, addMessageRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMessageRepositoryStub, 'add')
    await sut.add(mockAddMessageParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddMessageParams())
  })

  it('Should throw if AddMessageRepository throws', async () => {
    const { sut, addMessageRepositoryStub } = makeSut()
    jest.spyOn(addMessageRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddMessageParams())
    await expect(promise).rejects.toThrow()
  })
})
