import { LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'

export class UserMongoRepository implements LoadUserByIdRepository {
  async loadById (userId: string): Promise<UserModel> {
    return null
  }
}
