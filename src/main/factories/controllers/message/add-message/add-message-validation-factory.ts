import { Validation } from '@/presentation/protocols'
import { RequiredFieldsValidator } from '@/validation/validators/required-fields-validator'

export const makeAddMessageValidation = (): Validation => {
  const requiredFields = ['name', 'message']
  return new RequiredFieldsValidator(requiredFields)
}
