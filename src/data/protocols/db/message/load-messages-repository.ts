import { MessageModel } from '@/domain/models/message'
import { LoadMessagesParams } from '@/domain/usecases/message/load-messages'

export interface LoadMessagesRepository {
  load (params: LoadMessagesParams): Promise<MessageModel[]>
}
