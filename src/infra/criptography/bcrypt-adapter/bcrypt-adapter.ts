import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '@/data/protocols/criptography'

export class BcryptAdapter implements HashComparer, Hasher {
  constructor (private readonly salt: number) {}

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
