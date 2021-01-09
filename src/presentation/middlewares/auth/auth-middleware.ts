import { LoadUserByToken } from '@/domain/usecases/user/load-user-by-token'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, noContent, unauthorized } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadUserByToken: LoadUserByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const user = await this.loadUserByToken.loadByToken(accessToken)
      if (!user) {
        return forbidden(new AccessDeniedError())
      }
      return noContent()
    }
    return unauthorized()
  }
}
