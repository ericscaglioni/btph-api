import { AddMessageRepository } from '@/data/protocols/db/message'
import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { MongoHelper } from './../helpers/mongo-helper'

export class MessageMongoRepository implements AddMessageRepository {
  async add (message: AddMessageParams): Promise<void> {
    const messageCollection = await MongoHelper.getCollection('messages')
    await messageCollection.insertOne({
      ...message,
      date: new Date(),
      read: false
    })
  }
}
