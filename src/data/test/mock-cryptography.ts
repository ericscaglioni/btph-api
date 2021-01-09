import { Decrypter } from '@/data/protocols/criptography'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return 'any_user_id'
    }
  }
  return new DecrypterStub()
}
