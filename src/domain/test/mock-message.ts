import { AddMessageParams } from '@/domain/usecases/message/add-message'

export const mockAddMessageParams = (): AddMessageParams => ({
  name: 'any_name',
  message: 'any_message'
})
