export class EmailInUseError extends Error {
  constructor () {
    super('The provided email is already in use')
    this.name = 'EmailInUseError'
  }
}
