import bcrypt from 'bcrypt'
import { HashComparer } from '@/data/protocols/criptography'

export class BcryptAdapter implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
