import { AuthenticationModel } from '@/domain/models/authentication'
import { mockAuthenticationModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases/user/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authParams: AuthenticationParams): Promise<AuthenticationModel> {
      return mockAuthenticationModel()
    }
  }
  return new AuthenticationStub()
}
