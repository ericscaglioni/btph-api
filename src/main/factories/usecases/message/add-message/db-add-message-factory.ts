import { DbAddMessage } from '@/data/usecases/message/add-message/db-add-message'
import { AddMessage } from '@/domain/usecases/message/add-message'
import { MessageMongoRepository } from '@/infra/db/mongodb/message/message-mongo-repository'

export const makeDbAddMessage = (): AddMessage => {
  const messageMongoRepository = new MessageMongoRepository()
  const dbAddMessage = new DbAddMessage(messageMongoRepository)
  return dbAddMessage
}
