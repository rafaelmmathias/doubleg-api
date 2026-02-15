import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'

export const swaggerUi_serve = swaggerUi.serve
export const swaggerUi_setup = swaggerUi.setup(swaggerDoc)
