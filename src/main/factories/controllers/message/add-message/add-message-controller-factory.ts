import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddMessage } from '@/main/factories/usecases/message/add-message/db-add-message-factory'
import { AddMessageController } from '@/presentation/controllers/message/add-message/add-message-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddMessageValidation } from './add-message-validation-factory'

export const makeAddMessageController = (): Controller => {
  const addMessageController = new AddMessageController(
    makeDbAddMessage(),
    makeAddMessageValidation()
  )
  return makeLogControllerDecorator(addMessageController)
}
