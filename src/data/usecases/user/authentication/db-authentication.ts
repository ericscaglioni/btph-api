import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { AuthenticationModel } from '@/domain/models/authentication'
import { Authentication, AuthenticationParams } from '@/domain/usecases/user/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  async auth (authParams: AuthenticationParams): Promise<AuthenticationModel> {
    await this.loadUserByEmailRepository.loadByEmail(authParams.email)
    return null
  }
}
