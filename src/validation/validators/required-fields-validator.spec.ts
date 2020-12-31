import { MissingParamError } from '@/presentation/errors'
import faker from 'faker'
import { RequiredFieldsValidator } from './required-fields-validator'

const requiredFields = [faker.lorem.word()]

const mockRandomObject = (): object => ({
  [`${faker.random.word()}`]: faker.lorem.word()
})

const makeSut = (): RequiredFieldsValidator => new RequiredFieldsValidator(requiredFields)

describe('Required Fields Validator', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate(mockRandomObject())
    expect(error).toEqual(new MissingParamError(requiredFields[0]))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [`${requiredFields[0]}`]: 'field' })
    expect(error).toBeFalsy()
  })
})
