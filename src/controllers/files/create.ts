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

        const existing = await prisma.file.findUnique({ where: { hash }, include: { tags: true } })

        if (existing) {
            fs.unlinkSync(tempPath)
            return res.status(200).json({ ...existing, tags: existing.tags.map((t) => t.name) })
        }

        const ext = path.extname(req.file.originalname)
        const finalPath = moveToFinalPath(tempPath, hash, ext)
        const tagNames: string[] = typeof tags === 'string' ? [tags] : (tags ?? [])

        const file = await prisma.file.create({
            data: {
                name,
                owner,
                description,
                tags: { create: tagNames.map((tagName: string) => ({ name: tagName })) },
                originalName: req.file.originalname,
                storedName: `${hash}${ext}`,
                mimeType: req.file.mimetype,
                size: req.file.size,
                hash,
                path: finalPath
            },
            include: { tags: true }
        })

        res.status(201).json({ ...file, tags: file.tags.map((t) => t.name) })
    } catch (err) {
        next(err)
    }
}