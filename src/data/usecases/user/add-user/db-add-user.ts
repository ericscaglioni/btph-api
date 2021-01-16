import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'
import { UserModel } from '@/domain/models/user'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'

export class DbAddUser implements AddUser {
  constructor (private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

  async add (user: AddUserParams): Promise<UserModel> {
    await this.loadUserByEmailRepository.loadByEmail(user.email)
    return null
  }
}
