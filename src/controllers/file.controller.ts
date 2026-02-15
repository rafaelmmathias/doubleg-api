
import { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import fs from 'fs'
import path from 'path'
import { generateHash, moveToFinalPath } from '../services/file.service'

export const create = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' })
  }

  const { name, description, owner } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const tempPath = req.file.path
  const hash = generateHash(tempPath)

  const existing = await prisma.file.findUnique({ where: { hash } })

  if (existing) {
    fs.unlinkSync(tempPath)
    return res.status(200).json(existing)
  }

  const ext = path.extname(req.file.originalname)
  const finalPath = moveToFinalPath(tempPath, hash, ext)

  const file = await prisma.file.create({
    data: {
      name,
      owner,
      description,
      originalName: req.file.originalname,
      storedName: `${hash}${ext}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      hash,
      path: finalPath
    }
  })

  res.status(201).json(file)
}

export const updateMetadata = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, owner } = req.body

  const file = await prisma.file.findUnique({
    where: { id }
  })

  if (!file) {
    return res.status(404).json({ message: 'File not found' })
  }

  const updated = await prisma.file.update({
    where: { id },
    data: {
      name: name ?? file.name,
      description: description ?? file.description,
      owner: owner ?? file.owner
    }
  })

  res.json(updated)
}


export const findAll = async (_: Request, res: Response) => {
  const files = await prisma.file.findMany()
  res.json(files)
}

export const download = async (req: Request, res: Response) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id }
  })

  if (!file) return res.status(404).json({ message: 'Not found' })

  res.download(file.path)
}

export const remove = async (req: Request, res: Response) => {
  const file = await prisma.file.findUnique({
    where: { id: req.params.id }
  })

  if (!file) return res.status(404).json({ message: 'Not found' })

  fs.unlinkSync(file.path)
  await prisma.file.delete({ where: { id: file.id } })

  res.json({ message: 'Deleted' })
}
