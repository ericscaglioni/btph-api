import { AddMessageParams } from '@/domain/usecases/message/add-message'
import faker from 'faker'

const name = faker.name.findName()
const message = faker.lorem.paragraphs(3)

export const mockAddMessageParams = (): AddMessageParams => ({
  name,
  message
})
