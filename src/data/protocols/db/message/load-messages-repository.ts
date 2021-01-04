import { MessageModel } from '@/domain/models/message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'

export interface LoadMessagesRepository {
  load (message: LoadMessagesParams): Promise<MessageModel[]>
}
