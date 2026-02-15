
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'

export const swaggerConfig = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDoc)
}