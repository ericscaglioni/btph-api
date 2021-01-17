import { UserModel } from '@/domain/models/user'
import { mockUser } from '@/domain/test'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'
import { Validation } from '@/presentation/protocols/validation'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (userData: AddUserParams): Promise<UserModel> {
      return mockUser()
    }
  }
  return new AddUserStub()
}
