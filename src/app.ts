import express, { Router } from 'express'
import cors from 'cors'
import fileRoutes from './routes/file.routes'
import { swaggerUi_serve, swaggerUi_setup } from './swagger'
import swaggerDoc from './swagger.json'

const app = express()
const router = Router()
app.use(cors())
app.use(express.json())

app.use('/api/files', fileRoutes)

router.get('/', (req, res) => {
  res.send(swaggerDoc)
})
app.use('/teste', router)
app.use('/docs', swaggerUi_serve, swaggerUi_setup)

export default app
