import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddUser, Controller, HttpRequest, HttpResponse, Validation } from './add-user-controller-protocols'

export class AddUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUser: AddUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const user = await this.addUser.add({
        name,
        email,
        password
      })
      return user ? ok(user) : forbidden(new EmailInUseError())
    } catch (error) {
      return serverError(error)
    }
  }
}
