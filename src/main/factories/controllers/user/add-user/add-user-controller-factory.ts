import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddUser } from '@/main/factories/usecases/user/add-user/db-add-user-factory'
import { AddUserController } from '@/presentation/controllers/user/add-user/add-user-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddUserValidation } from './add-user-validation-factory'

export const makeAddUserController = (): Controller => {
  const addUserController = new AddUserController(
    makeAddUserValidation(),
    makeDbAddUser()
  )
  return makeLogControllerDecorator(addUserController)
}
