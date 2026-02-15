import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuid } from 'uuid'
import * as fileController from '../controllers/file.controller'

const router = Router()

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, `${uuid()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

router.post('/', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Fazer upload de arquivo' */
  /* #swagger.requestBody = {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: { type: 'string', format: 'binary', description: 'Arquivo a ser enviado' },
                name: { type: 'string', example: 'Meu documento', description: 'Nome do arquivo' },
                description: { type: 'string', example: 'Descrição do arquivo', description: 'Descrição opcional' },
                owner: { type: 'string', example: 'user123', description: 'Proprietário do arquivo' }
              },
              required: ['file', 'name', 'owner']
            }
          }
        }
  } */
  /* #swagger.responses[201] = {
        description: 'Arquivo criado com sucesso'
  } */
  /* #swagger.responses[400] = {
        description: 'Arquivo não fornecido ou nome ausente'
  } */
  next()
}, upload.single('file'), fileController.create)

router.put('/:id', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Atualizar metadados do arquivo' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        schema: { type: 'string' }
  } */
  /* #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Nome atualizado' },
                description: { type: 'string', example: 'Descrição atualizada' }
              }
            }
          }
        }
  } */
  /* #swagger.responses[200] = {
        description: 'Arquivo atualizado com sucesso'
  } */
  /* #swagger.responses[404] = {
        description: 'Arquivo não encontrado'
  } */
  next()
}, fileController.updateMetadata)

router.get('/', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Listar arquivos' */
  /* #swagger.responses[200] = {
        description: 'Lista de arquivos'
  } */
  next()
}, fileController.findAll)

router.get('/view/:id', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Visualizar arquivo (sem download)' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do arquivo',
        required: true,
        type: 'string'
  } */
  /* #swagger.responses[200] = {
        description: 'Arquivo encontrado e pronto para visualização'
  } */
  /* #swagger.responses[404] = {
        description: 'Arquivo não encontrado'
  } */
  next()
}, fileController.view)

router.get('/:id', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Download do arquivo' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        schema: { type: 'string' }
  } */
  /* #swagger.responses[200] = {
        description: 'Arquivo encontrado'
  } */
  /* #swagger.responses[404] = {
        description: 'Arquivo não encontrado'
  } */
  next()
}, fileController.download)

router.delete('/:id', (req, res, next) => {
  /* #swagger.tags = ['Files'] */
  /* #swagger.summary = 'Deletar arquivo' */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        schema: { type: 'string' }
  } */
  /* #swagger.responses[200] = {
        description: 'Arquivo deletado com sucesso'
  } */
  /* #swagger.responses[404] = {
        description: 'Arquivo não encontrado'
  } */
  next()
}, fileController.remove)

export default router