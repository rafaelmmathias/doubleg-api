import { Request, Response, NextFunction } from 'express'
import { generateHash, moveToFinalPath } from "@/services/file.service"
import { prisma } from '@/prisma/client'
import fs from 'fs'
import path from 'path'
import { ApiError } from '@/errors/apiError'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new ApiError(400, 'No file provided')
        }

        const { name, description, owner, tags } = req.body

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
                tags: tags ?? [],
                originalName: req.file.originalname,
                storedName: `${hash}${ext}`,
                mimeType: req.file.mimetype,
                size: req.file.size,
                hash,
                path: finalPath
            }
        })

        res.status(201).json(file)
    } catch (err) {
        next(err)
    }
}