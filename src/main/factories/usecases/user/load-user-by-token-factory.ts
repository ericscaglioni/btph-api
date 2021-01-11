import { DbLoadUserByToken } from '@/data/usecases/user/load-user-by-token/db-load-user-by-token'
import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { UserMongoRepository } from '@/infra/db/mongodb/user/user-mongo-repository'
import config from '@/main/config/environment'

export const makeDbLoadUserByToken = (): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(config.jwtSecret)
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUserByToken(jwtAdapter, userMongoRepository)
}
