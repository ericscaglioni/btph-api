import { AddUserRepository, LoadUserByEmailRepository, LoadUserByIdRepository } from '@/data/protocols/db/user'
import { UserModel } from '@/domain/models/user'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class UserMongoRepository implements LoadUserByIdRepository, AddUserRepository, LoadUserByEmailRepository {
  async loadById (userId: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectId(userId) })
    return user && MongoHelper.map(user)
  }

  async add (userData: AddUserParams): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(userData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }
}
