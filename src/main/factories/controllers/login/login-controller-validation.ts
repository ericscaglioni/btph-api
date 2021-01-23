import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols'
import { EmailValidation, RequiredFieldsValidator, ValidationComposite } from '@/validation/validators'

export const makeLoginControllerValidation = (): Validation => {
  const validations: Validation[] = []
  const requiredFieldNames = ['email', 'password']
  validations.push(new RequiredFieldsValidator(requiredFieldNames))
  const emailValidatorAdapter = new EmailValidatorAdapter()
  validations.push(new EmailValidation('email', emailValidatorAdapter))
  return new ValidationComposite(validations)
}
