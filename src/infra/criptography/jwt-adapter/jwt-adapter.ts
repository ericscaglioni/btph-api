import { Decrypter, Encrypter } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter, Encrypter {
  constructor (private readonly secret: string) {}

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value.id
  }

  async encrypt (value: string): Promise<string> {
    return await jwt.sign({ id: value }, this.secret)
  }
}
