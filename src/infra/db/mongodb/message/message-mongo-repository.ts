import { AddMessageRepository, LoadMessagesRepository } from '@/data/protocols/db/message'
import { MessageModel } from '@/domain/models/message'
import { AddMessageParams } from '@/domain/usecases/message/add-message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class MessageMongoRepository implements AddMessageRepository, LoadMessagesRepository {
  async add (message: AddMessageParams): Promise<void> {
    const messageCollection = await MongoHelper.getCollection('messages')
    await messageCollection.insertOne(message)
  }

  async load (params: LoadMessagesParams): Promise<MessageModel[]> {
    const { limit, offset } = params.pagination
    const messageCollection = await MongoHelper.getCollection('messages')
    const messages = await messageCollection.find<MessageModel>({
      date: {
        $gte: new Date(params.initialDate),
        $lte: new Date(params.finalDate)
      },
      read: params.read
    }).limit(limit)
      .skip(offset)
      .toArray()
    return MongoHelper.mapCollection(messages)
  }
}
