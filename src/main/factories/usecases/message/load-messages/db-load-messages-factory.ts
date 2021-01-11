import { DbLoadMessages } from '@/data/usecases/message/load-messages/db-load-messages'
import { LoadMessages } from '@/domain/usecases/message/load-messages'
import { MessageMongoRepository } from '@/infra/db/mongodb/message/message-mongo-repository'

export const makeDbLoadMessages = (): LoadMessages => {
  const messageMongoRepository = new MessageMongoRepository()
  return new DbLoadMessages(messageMongoRepository)
}
