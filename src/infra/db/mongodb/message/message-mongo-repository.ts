import { AddMessageRepository, LoadMessagesRepository } from '@/data/protocols/db/message'
import { MessageModel } from '@/domain/models/message'
import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'
import { MongoHelper } from './../helpers/mongo-helper'

export class MessageMongoRepository implements AddMessageRepository, LoadMessagesRepository {
  async add (message: AddMessageParams): Promise<void> {
    const messageCollection = await MongoHelper.getCollection('messages')
    await messageCollection.insertOne(message)
  }

  async load (message: LoadMessagesParams): Promise<MessageModel[]> {
    const { limit, offset } = message.pagination
    const messageCollection = await MongoHelper.getCollection('messages')
    const messages = await messageCollection.find<MessageModel>({
      date: {
        $gte: message.initialDate,
        $lte: message.finalDate
      },
      read: message.read
    }).limit(limit)
      .skip(offset)
      .toArray()
    return messages
  }
}
