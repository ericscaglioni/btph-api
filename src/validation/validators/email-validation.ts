import { EmailValidator } from '@/validation/protocols/email-validator'
import { Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    this.emailValidator.isValid(input[this.fieldName])
    return null
  }
}
