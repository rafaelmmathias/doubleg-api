import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { unprocessable } from '@/errors/apiError'

type SchemaMap = {
  body?: ZodSchema<any>
  params?: ZodSchema<any>
  query?: ZodSchema<any>
}

export const validate = (schemas: SchemaMap) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body)
      if (schemas.params) req.params = schemas.params.parse(req.params)
      if (schemas.query) req.query = schemas.query.parse(req.query)
      return next()
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        return next(unprocessable('Validation failed', errors))
      }
      return next(err)
    }
  }
}

export default validate
