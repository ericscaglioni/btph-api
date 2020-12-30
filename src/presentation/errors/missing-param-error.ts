export class MissingParamError extends Error {
  constructor (paramName: string) {
    super('MissingParamError')
    this.name = `Missing param: ${paramName}`
  }
}
