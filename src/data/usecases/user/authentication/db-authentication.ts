import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { AuthenticationModel } from '@/domain/models/authentication'
import { Authentication, AuthenticationParams } from '@/domain/usecases/user/authentication'

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
