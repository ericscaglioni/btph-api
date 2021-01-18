import { AuthenticationModel, AuthenticationParams, Authenticator, Encrypter, HashComparer, LoadUserByEmailRepository } from './db-authenticator-protocols'

export class DbAuthenticator implements Authenticator {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authParams.email)
    if (user) {
      const isValid = await this.hashComparer.compare(authParams.password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)
        return {
          accessToken,
          name: user.name
        }
      }
    }
    return null
  }
}
