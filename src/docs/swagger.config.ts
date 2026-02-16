
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'
import { Request, Response, NextFunction } from 'express'

export const swaggerConfig = {
  serve: swaggerUi.serve,
  // Use a wrapper so we can inject the request host (browser host) dynamically
  setup: (req: Request, res: Response, next: NextFunction) => {
    const doc = JSON.parse(JSON.stringify(swaggerDoc)) as any
    const host = req.get('host')
    const protocol = req.protocol

    if (doc.swagger && String(doc.swagger).startsWith('2')) {
      doc.host = host
      doc.schemes = [protocol]
    } else {
      doc.servers = [{ url: `${protocol}://${host}` }]
    }

    return swaggerUi.setup(doc)(req, res, next)
  }
}