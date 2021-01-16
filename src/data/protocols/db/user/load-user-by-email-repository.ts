import { UserModel } from '@/domain/models/user'

export interface LoadUserByEmailRepository {
  loadByEmail (email: string): Promise<UserModel>
}
