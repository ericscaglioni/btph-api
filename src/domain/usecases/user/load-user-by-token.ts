import { UserModel } from '@/domain/models/user'

export interface LoadUserByToken {
  loadByToken (accessToken: string): Promise<UserModel>
}
