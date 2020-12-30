import { AddMessageParams } from '@/domain/usecases/message/add-message'

export interface AddMessageRepository {
  add (message: AddMessageParams): Promise<void>
}
