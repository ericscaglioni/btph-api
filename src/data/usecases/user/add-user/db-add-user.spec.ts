import { LoadUserByEmailRepository } from '@/data/protocols/db/user'
import { mockUser } from '@/domain/test'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import faker from 'faker'
import { UserModel } from '../load-user-by-token/db-load-user-by-token-protocols'
import { DbAddUser } from './db-add-user'

const mockAddUserParams = (): AddUserParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositortyStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<UserModel> {
      return mockUser()
    }
  }
  return new LoadUserByEmailRepositortyStub()
}

type SutTypes = {
  sut: DbAddUser
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const sut = new DbAddUser(loadUserByEmailRepositoryStub)
  return {
    sut,
    loadUserByEmailRepositoryStub
  }
}

describe('Add User usecase', () => {
  it('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    const params = mockAddUserParams()
    await sut.add(params)
    expect(loadByEmailSpy).toHaveBeenCalledWith(params.email)
  })
})
