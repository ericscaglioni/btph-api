import { UserModel } from '@/domain/models/user'

type AddUserParams = Omit<UserModel, 'id'>

export interface AddUser {
  add (user: AddUserParams): Promise<UserModel>
}
