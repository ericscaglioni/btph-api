import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidator } from './compare-fields-validator'

const makeSut = (): CompareFieldsValidator => new CompareFieldsValidator('field', 'fieldToCompare')

describe('Compare Fields Validator', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'any_field_to_compare' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(error).toBeFalsy()
  })
})
