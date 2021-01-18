import { HashComparer } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { AuthenticationModel } from '@/domain/models/authentication'
import { AuthenticationParams, Authenticator } from '@/domain/usecases/user/authenticator'

export class DbAuthenticator implements Authenticator {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authParams.email)
    if (user) {
      await this.hashComparer.compare(authParams.password, user.password)
    }
    return null
  }
}
