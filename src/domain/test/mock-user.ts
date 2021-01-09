import { UserModel } from '@/domain/models/user'
import faker from 'faker'

export const mockUser = (): UserModel => ({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
