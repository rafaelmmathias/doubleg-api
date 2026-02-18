import { Request, Response, NextFunction } from 'express'
import { prisma } from "@/prisma/client"
import { ApiError } from '@/errors/apiError'

export const download = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: req.params.id }
        })

        if (!file) throw new ApiError(404, 'File not found')

        return res.download(file.path, file.originalName)
    } catch (err) {
        next(err)
    }
}