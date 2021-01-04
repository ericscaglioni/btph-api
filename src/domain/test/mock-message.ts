import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'
import faker from 'faker'
import { MessageModel } from '../models/message'

const name = faker.name.findName()
const message = faker.lorem.paragraphs(3)
const date = faker.date.recent()

export const mockAddMessageParams = (): AddMessageParams => ({
  name,
  message,
  date,
  read: false
})

export const mockMessageModels = (): MessageModel[] => ([{
  id: faker.random.uuid(),
  ...mockAddMessageParams()
}, {
  id: faker.random.uuid(),
  ...mockAddMessageParams()
}])

export const mockLoadMessagesParams = (): LoadMessagesParams => ({
  initialDate: faker.date.recent(),
  finalDate: faker.date.future(),
  read: false,
  pagination: {
    limit: 10,
    offset: 0
  }
})
