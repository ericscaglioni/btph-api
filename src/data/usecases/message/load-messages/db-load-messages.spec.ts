import { LoadMessagesRepository } from '@/data/protocols/db/message'
import { mockLoadMessagesRepository } from '@/data/test'
import { mockLoadMessagesParams } from '@/domain/test'
import { DbLoadMessages } from './db-load-messages'

type SutTypes = {
  sut: DbLoadMessages
  loadMessagesRepositoryStub: LoadMessagesRepository
}

const makeSut = (): SutTypes => {
  const loadMessagesRepositoryStub = mockLoadMessagesRepository()
  const sut = new DbLoadMessages(loadMessagesRepositoryStub)
  return {
    sut,
    loadMessagesRepositoryStub
  }
}

describe('DbLoadMessages usecase', () => {
  it('Should call LoadMessagesRepository with correct data', async () => {
    const { sut, loadMessagesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadMessagesRepositoryStub, 'load')
    const loadMessagesParams = mockLoadMessagesParams()
    await sut.load(loadMessagesParams)
    expect(loadSpy).toHaveBeenCalledWith(loadMessagesParams)
  })

  it('Should throw if LoadMessagesRepository throws', async () => {
    const { sut, loadMessagesRepositoryStub } = makeSut()
    jest.spyOn(loadMessagesRepositoryStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.load(mockLoadMessagesParams())
    await expect(promise).rejects.toThrow()
  })
})
