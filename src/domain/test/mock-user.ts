import { UserModel } from '@/domain/models/user'
import faker from 'faker'

const fakeId = faker.random.uuid()
const fakeName = faker.name.firstName()
const fakeEmail = faker.internet.email()
const fakePassword = faker.internet.password()

export const mockUser = (): UserModel => ({
  id: fakeId,
  name: fakeName,
  email: fakeEmail,
  password: fakePassword
})
