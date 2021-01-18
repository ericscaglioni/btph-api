import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { AuthenticationModel } from '@/domain/models/authentication'
import { AuthenticationParams, Authenticator } from '@/domain/usecases/user/authenticator'

export class DbAuthenticator implements Authenticator {
  constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationModel> {
    await this.loadUserByEmailRepository.loadByEmail(authParams.email)
    return null
  }
}
