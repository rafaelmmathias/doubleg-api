import { prisma } from '@/prisma/client'
import { Request, Response } from 'express'

export const getList = async (req: Request, res: Response) => {
    const { q, tag } = req.query

    const where: any = {}

    const filters: any[] = []

    if (q) {
        filters.push({
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { owner: { contains: q, mode: 'insensitive' } }
            ]
        })
    }

    if (tag) {
        filters.push({
            tags: { hasSome: [tag] }
        })
    }

    if (filters.length > 0) {
        where.AND = filters
    }

    const files = await prisma.file.findMany({
        where,
        select: {
            id: true,
            name: true,
            description: true,
            owner: true,
            tags: true,
            createdAt: true,
            mimeType: true,
            size: true,
        }
    })

    const filesWithViewUrl = files.map((file: any) => ({
        ...file,
        path: `/api/files/view/${file.id}`
    }))

    res.json(filesWithViewUrl)
}