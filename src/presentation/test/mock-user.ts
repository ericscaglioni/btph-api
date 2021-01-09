import { UserModel } from '@/domain/models/user'
import { mockUser } from '@/domain/test'
import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'

export const mockLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    async loadByToken (accessToken: string): Promise<UserModel> {
      return mockUser()
    }
  }
  return new LoadUserByTokenStub()
}
