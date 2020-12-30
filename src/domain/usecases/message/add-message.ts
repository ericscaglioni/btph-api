export type AddMessageParams = {
  name: string
  message: string
}

export interface AddMessage {
  add (message: AddMessageParams): Promise<void>
}
