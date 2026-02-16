import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { view, update, getList, download, create, remove } from '../controllers/files'

const router = Router()

const storage = multer.diskStorage({
      destination: 'uploads/',
      filename: (_, file, cb) => {
            cb(null, `${uuid()}${path.extname(file.originalname)}`)
      }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), create)
router.get('/', getList)
router.put('/:id', update)
router.get('/view/:id', view)
router.get('/:id', download)
router.delete('/:id', remove)

export default router