import { makeDbAddUser } from '@/main/factories/usecases/user/add-user/db-add-user-factory'
import { AddUserController } from '@/presentation/controllers/user/add-user/add-user-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddUserValidation } from './add-user-validation-factory'

export const makeAddUserController = (): Controller => {
  return new AddUserController(
    makeAddUserValidation(),
    makeDbAddUser()
  )
}
