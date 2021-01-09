import { unauthorized } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (!accessToken) {
      return unauthorized()
    }
  }
}
