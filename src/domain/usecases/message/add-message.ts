export type AddMessageParams = {
  name: string
  message: string
  date: Date
  read: boolean
}

export interface AddMessage {
  add (message: AddMessageParams): Promise<void>
}
