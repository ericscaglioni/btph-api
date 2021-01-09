import { LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class UserMongoRepository implements LoadUserByIdRepository {
  async loadById (userId: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: userId })
    return user && MongoHelper.map(user)
  }
}
