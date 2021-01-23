import { makeDbAuthentication } from '@/main/factories/usecases/user/authentication/db-authentication-factory'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoginControllerValidation } from './login-controller-validation'

export const makeLoginController = (): Controller =>
  new LoginController(
    makeLoginControllerValidation(),
    makeDbAuthentication()
  )
