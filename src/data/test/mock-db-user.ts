import { LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { mockUser } from '@/domain/test'

export const mockLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositortyStub implements LoadUserByIdRepository {
    async loadById (userId: string): Promise<UserModel> {
      return mockUser()
    }
  }
  return new LoadUserByIdRepositortyStub()
}
