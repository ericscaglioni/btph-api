import { AuthenticationModel } from '@/domain/models/authentication'
import { UserModel } from '@/domain/models/user'
import { mockUser } from '@/domain/test'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'
import { AuthenticationParams, Authenticator } from '@/domain/usecases/user/authenticator'
import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'

export const mockLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    async loadByToken (accessToken: string): Promise<UserModel> {
      return mockUser()
    }
  }
  return new LoadUserByTokenStub()
}

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (userData: AddUserParams): Promise<UserModel> {
      return mockUser()
    }
  }
  return new AddUserStub()
}

export const mockAuthenticator = (): Authenticator => {
  class AuthenticatorStub implements Authenticator {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
  }
  return new AuthenticatorStub()
}
