export type HttpRequest = {
  body?: any
  query?: any
  headers?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}
