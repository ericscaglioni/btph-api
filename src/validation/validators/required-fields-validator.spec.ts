import { MissingParamError } from '@/presentation/errors'
import faker from 'faker'
import { RequiredFieldsValidator } from './required-fields-validator'

const requiredFields = [faker.lorem.word()]

const mockRandomObject = (): object => ({
  [`${faker.random.word()}`]: faker.lorem.word()
})

describe('Required Fields Validator', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidator(requiredFields)
    const error = sut.validate(mockRandomObject())
    expect(error).toEqual(new MissingParamError(requiredFields[0]))
  })
})
