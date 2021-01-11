import { makeDbLoadMessages } from '@/main/factories/usecases/message/load-messages/db-load-messages-factory'
import { LoadMessagesController } from '@/presentation/controllers/message/load-messages/load-messages-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadMessagesController = (): Controller => new LoadMessagesController(makeDbLoadMessages())
