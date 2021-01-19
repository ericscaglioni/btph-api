import { EmailValidator } from '@/validation/protocols/email-validator'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    validator.isEmail(email)
    return false
  }
}
