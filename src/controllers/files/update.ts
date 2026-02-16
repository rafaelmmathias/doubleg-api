import { prisma } from '@/prisma/client'
import { Request, Response } from 'express'

export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description, owner, tags } = req.body

    const file = await prisma.file.findUnique({
        where: { id }
    })

    if (!file) {
        return res.status(404).json({ message: 'File not found' })
    }

    const updated = await prisma.file.update({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            owner: true,
            tags: true,
            createdAt: true,
            mimeType: true,
            size: true,
        },
        data: {
            name: name ?? file.name,
            description: description ?? file.description,
            owner: owner ?? file.owner,
            tags: tags ?? file.tags
        }
    })

    res.json(updated)
}