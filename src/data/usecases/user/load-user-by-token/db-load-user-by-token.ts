import { Decrypter, LoadUserByIdRepository, LoadUserByToken, UserModel } from './db-load-user-by-token-protocols'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) {}

  async loadByToken (accessToken: string): Promise<UserModel> {
    let userId: string
    try {
      userId = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (userId) {
      const user = await this.loadUserByIdRepository.loadById(userId)
      return user
    }
    return null
  }
}
