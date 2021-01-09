import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'
import { unauthorized } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadUserByToken: LoadUserByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadUserByToken.loadByToken(accessToken)
    }
    return unauthorized()
  }
}
