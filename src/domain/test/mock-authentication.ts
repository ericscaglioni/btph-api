import { AuthenticationModel } from '@/domain/models/authentication'

export const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: 'any_token',
  name: 'any_name',
  email: 'any_email@email.com'
})
