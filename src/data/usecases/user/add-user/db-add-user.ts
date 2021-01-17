import { Hasher } from '@/data/protocols/criptography'
import { AddUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add (userData: AddUserParams): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.loadByEmail(userData.email)
    if (!user) {
      const hashedPassword = await this.hasher.hash(userData.password)
      return await this.addUserRepository.add({
        ...userData,
        password: hashedPassword
      })
    }
    return null
  }
}
