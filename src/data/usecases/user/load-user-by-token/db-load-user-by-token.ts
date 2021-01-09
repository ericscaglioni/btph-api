import { Decrypter } from '@/data/protocols/criptography'
import { UserModel } from '@/domain/models/user'
import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async loadByToken (accessToken: string): Promise<UserModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
