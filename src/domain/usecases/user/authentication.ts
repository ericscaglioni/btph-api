import { AuthenticationModel } from '@/domain/models/authentication'

type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth (authParams: AuthenticationParams): Promise<AuthenticationModel>
}
