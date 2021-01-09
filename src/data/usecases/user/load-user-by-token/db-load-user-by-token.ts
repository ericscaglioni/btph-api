import { Decrypter } from '@/data/protocols/criptography'
import { LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'

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
      await this.loadUserByIdRepository.loadById(userId)
    }
    return null
  }
}
