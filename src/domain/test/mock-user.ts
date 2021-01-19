import { UserModel } from '@/domain/models/user'
import faker from 'faker'

const fakeName = faker.name.firstName()
const fakeEmail = faker.internet.email()

export const mockUser = (): UserModel => ({
  id: 'any_id',
  name: fakeName,
  email: fakeEmail,
  password: 'hashed_password'
})
