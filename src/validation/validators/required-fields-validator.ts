import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class RequiredFieldsValidator implements Validation {
  constructor (private readonly fieldNames: string[]) {}

  validate (input: any): Error {
    for (const fieldName of this.fieldNames) {
      if (!input[fieldName]) {
        return new MissingParamError(fieldName)
      }
    }
  }
}
