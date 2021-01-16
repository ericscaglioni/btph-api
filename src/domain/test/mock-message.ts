import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'
import faker from 'faker'
import { MessageModel } from '../models/message'

const name = faker.name.findName()
const message = faker.lorem.paragraphs(3)
const id = faker.random.uuid()
const id2 = faker.random.uuid()

export const mockAddMessageParams = (): AddMessageParams => ({
  name,
  message,
  date: new Date(),
  read: false
})

export const mockMessageModels = (): MessageModel[] => ([{
  id,
  ...mockAddMessageParams()
}, {
  id: id2,
  ...mockAddMessageParams()
}])

export const mockLoadMessagesParams = (): LoadMessagesParams => ({
  initialDate: new Date().toISOString(),
  finalDate: new Date().toISOString(),
  read: false,
  pagination: {
    limit: 10,
    offset: 0
  }
})
