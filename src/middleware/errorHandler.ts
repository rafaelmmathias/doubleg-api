import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/errors/apiError'

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors ?? [],
      code: err.code ?? null
    })
  }

  // Fallback generic error
  console.error(err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    errors: [],
    code: null
  })
}

export default errorHandler
