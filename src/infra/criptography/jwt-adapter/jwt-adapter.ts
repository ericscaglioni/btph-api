import { Decrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter {
  constructor (private readonly secret: string) {}

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value.id
  }
}
