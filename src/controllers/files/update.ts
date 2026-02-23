import { prisma } from '@/prisma/client'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/errors/apiError'

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { name, description, owner, tags } = req.body

        const file = await prisma.file.findUnique({
            where: { id }
        })

        if (!file) {
            throw new ApiError(404, 'File not found')
        }

        const tagData = tags !== undefined
            ? {
                tags: {
                    deleteMany: {},
                    create: (typeof tags === 'string' ? [tags] : tags).map((tagName: string) => ({ name: tagName }))
                }
            }
            : {}

        const updated = await prisma.file.update({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                owner: true,
                tags: { select: { name: true } },
                createdAt: true,
                mimeType: true,
                size: true,
            },
            data: {
                name: name ?? file.name,
                description: description ?? file.description,
                owner: owner ?? file.owner,
                ...tagData
            }
        })

        res.json({ ...updated, tags: updated.tags.map((t) => t.name) })
    } catch (err) {
        next(err)
    }
}