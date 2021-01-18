import { AuthenticationParams } from '@/domain/usecases/user/authenticator'
import { UserModel } from '@/domain/models/user'
import faker from 'faker'

const fakeName = faker.name.firstName()
const fakeEmail = faker.internet.email()
const fakePassword = faker.internet.password()

export const mockUser = (): UserModel => ({
  id: 'any_id',
  name: fakeName,
  email: fakeEmail,
  password: 'hashed_password'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: fakeEmail,
  password: fakePassword
})
