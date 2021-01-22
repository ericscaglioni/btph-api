import { Authentication, AuthenticationModel, AuthenticationParams, Encrypter, HashComparer, LoadUserByEmailRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
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
          name: user.name,
          email: user.email
        }
      }
    }
    return null
  }
}
