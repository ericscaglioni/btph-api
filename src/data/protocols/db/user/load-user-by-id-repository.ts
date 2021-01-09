import { UserModel } from '@/domain/models/user'

export interface LoadUserByIdRepository {
  loadById (userId: string): Promise<UserModel>
}
