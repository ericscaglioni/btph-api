import { AddUserRepository, LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { mockUser } from '@/domain/test'
import { AddUserParams } from '@/domain/usecases/user/add-user'

export const mockLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositortyStub implements LoadUserByIdRepository {
    async loadById (userId: string): Promise<UserModel> {
      return mockUser()
    }
  }
  return new LoadUserByIdRepositortyStub()
}

export const mockAddUserRepository = (): AddUserRepository => {
  class AddUserRepositortyStub implements AddUserRepository {
    async add (userData: AddUserParams): Promise<UserModel> {
      return mockUser()
    }
  }
  return new AddUserRepositortyStub()
}
