import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { view, update, getList, download, create, remove } from '../controllers/files'
import validate from '@/middleware/validate'
import { createFileSchema, updateFileSchema } from '@/schemas/file.schema'

const router = Router()

const storage = multer.diskStorage({
      destination: 'uploads/',
      filename: (_, file, cb) => {
            cb(null, `${uuid()}${path.extname(file.originalname)}`)
      }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), validate({ body: createFileSchema.shape.body }), create)
router.get('/', getList)
router.put('/:id', validate({ params: updateFileSchema.shape.params, body: updateFileSchema.shape.body }), update)
router.get('/view/:id', validate({ params: updateFileSchema.shape.params }), view)
router.get('/:id', validate({ params: updateFileSchema.shape.params }), download)
router.delete('/:id', validate({ params: updateFileSchema.shape.params }), remove)

export default router