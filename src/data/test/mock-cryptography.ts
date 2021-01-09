import { Decrypter } from '@/data/protocols/criptography'
import faker from 'faker'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return faker.random.uuid()
    }
  }
  return new DecrypterStub()
}
