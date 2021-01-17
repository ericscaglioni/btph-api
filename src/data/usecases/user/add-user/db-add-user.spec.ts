import { Hasher } from '@/data/protocols/criptography/hasher'
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

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositortyStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<UserModel> {
      return null
    }
  }
  return new LoadUserByEmailRepositortyStub()
}

type SutTypes = {
  sut: DbAddUser
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddUser(loadUserByEmailRepositoryStub, hasherStub)
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hasherStub
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

  it('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if LoadUserByEmailRepository returns a user', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(mockUser())
    const user = await sut.add(mockAddUserParams())
    expect(user).toBeNull()
  })

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    const params = mockAddUserParams()
    await sut.add(params)
    expect(encryptSpy).toHaveBeenCalledWith(params.password)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })
})
