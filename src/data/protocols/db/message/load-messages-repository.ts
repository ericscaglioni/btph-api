import { MessageModel } from '@/domain/models/message'
import { LoadMessageParams } from '@/domain/usecases/message/load-messages'

export interface LoadMessagesRepository {
  load (message: LoadMessageParams): Promise<MessageModel[]>
}
