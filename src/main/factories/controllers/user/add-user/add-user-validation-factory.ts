import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols'
import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidationComposite } from '@/validation/validators'

export const makeAddUserValidation = (): Validation => {
  const validations: Validation[] = []
  const requiredFieldNames = ['name', 'email', 'password', 'passwordConfirmation']
  validations.push(new RequiredFieldsValidator(requiredFieldNames))
  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  const emailValidatorAdapter = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
