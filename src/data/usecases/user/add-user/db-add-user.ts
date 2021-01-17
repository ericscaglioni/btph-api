import { AddUser, AddUserParams, AddUserRepository, Hasher, LoadUserByEmailRepository, UserModel } from './db-add-user-protocols'

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
