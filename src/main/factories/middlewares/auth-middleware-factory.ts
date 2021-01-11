import { makeDbLoadUserByToken } from '@/main/factories/usecases/user/load-user-by-token-factory'
import { AuthMiddleware } from '@/presentation/middlewares/auth/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): Middleware =>
  new AuthMiddleware(makeDbLoadUserByToken())
