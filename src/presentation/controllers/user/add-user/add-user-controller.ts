import { AddUser } from '@/domain/usecases/user/add-user'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

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
      if (!user) {
        return forbidden(new EmailInUseError())
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
