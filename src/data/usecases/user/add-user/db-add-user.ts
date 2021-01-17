import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'
import { UserModel } from '@/domain/models/user'
import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { Hasher } from '@/data/protocols/criptography'

export class DbAddUser implements AddUser {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (userData: AddUserParams): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (!user) {
      await this.hasher.hash(userData.password)
    }
    return null
  }
}
