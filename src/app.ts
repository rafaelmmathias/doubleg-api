import express, { Router } from 'express'
import cors from 'cors'
import fileRoutes from './routes/file.routes'
import { swaggerConfig } from './docs/swagger.config'
import errorHandler from '@/middleware/errorHandler'

const app = express()
const router = Router()
app.use(cors())
app.use(express.json())

app.use('/api/files', fileRoutes)

app.use('/docs', swaggerConfig.serve, swaggerConfig.setup)

// Global error handler (returns standardized error shape)
app.use(errorHandler)

export default app
