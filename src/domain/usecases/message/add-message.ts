import { MessageModel } from '@/domain/models/message'

export type AddMessageParams = Omit<MessageModel, 'id'>

export interface AddMessage {
  add (message: AddMessageParams): Promise<void>
}
