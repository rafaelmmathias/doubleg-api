import { Request, Response, NextFunction } from 'express'
import { prisma } from "@/prisma/client"
import path from 'path'
import { ApiError } from '@/errors/apiError'

export const view = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: req.params.id }
        })

        if (!file) throw new ApiError(404, 'File not found')

        return res.sendFile(path.resolve(file.path))
    } catch (err) {
        next(err)
    }
}