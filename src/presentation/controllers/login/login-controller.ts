import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authenticatedUser = await this.authentication.auth({
        email,
        password
      })
      if (!authenticatedUser) {
        return unauthorized()
      }
      return ok(authenticatedUser)
    } catch (error) {
      return serverError(error)
    }
  }
}
