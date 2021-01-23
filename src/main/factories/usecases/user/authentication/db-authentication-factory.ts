import { DbAuthentication } from '@/data/usecases/user/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/user/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { UserMongoRepository } from '@/infra/db/mongodb/user/user-mongo-repository'
import env from '@/main/config/environment'

export const makeDbAuthentication = (): Authentication => {
  const userMongoRepository = new UserMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter)
}
