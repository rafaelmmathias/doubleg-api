export class ApiError extends Error {
  statusCode: number
  errors?: Array<{ field?: string; message: string }>
  code?: string

  constructor(statusCode: number, message: string, errors?: Array<{ field?: string; message: string }>, code?: string) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    this.code = code
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export const badRequest = (message = 'Bad Request', errors?: Array<{ field?: string; message: string }>) =>
  new ApiError(400, message, errors)

export const unprocessable = (message = 'Unprocessable Entity', errors?: Array<{ field?: string; message: string }>) =>
  new ApiError(422, message, errors)
