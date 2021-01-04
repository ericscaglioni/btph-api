import { MessageModel } from '@/domain/models/message'

type Pagination = {
  limit: number
  offset: number
}

export type LoadMessagesParams = {
  initialDate: Date
  finalDate: Date
  read: boolean
  pagination: Pagination
}

export interface LoadMessages {
  load (data: LoadMessagesParams): Promise<MessageModel[]>
}
