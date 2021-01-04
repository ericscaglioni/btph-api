import { LoadMessages } from '@/domain/usecases/message/load-messages'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadMessages } from '@/presentation/test'
import faker from 'faker'
import MockDate from 'mockdate'
import { LoadMessagesController } from './load-messages-controller'

const mockRequest = (): HttpRequest => ({
  query: {
    initialDate: faker.date.recent(),
    finalDate: faker.date.future(),
    read: false,
    limit: faker.random.number(10),
    offset: faker.random.number(10)
  }
})

type SutTypes = {
  sut: LoadMessagesController
  loadMessagesStub: LoadMessages
}

const makeSut = (): SutTypes => {
  const loadMessagesStub = mockLoadMessages()
  const sut = new LoadMessagesController(loadMessagesStub)
  return {
    sut,
    loadMessagesStub
  }
}

describe('Load Messages Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadMessages with correct data', async () => {
    const { sut, loadMessagesStub } = makeSut()
    const loadSpy = jest.spyOn(loadMessagesStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith({
      initialDate: httpRequest.query.initialDate,
      finalDate: httpRequest.query.finalDate,
      read: false,
      pagination: {
        limit: httpRequest.query.limit,
        offset: httpRequest.query.offset
      }
    })
  })
})
