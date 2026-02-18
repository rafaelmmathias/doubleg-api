import { Request, Response, NextFunction } from 'express'
import { prisma } from "@/prisma/client"
import fs from 'fs'
import { ApiError } from '@/errors/apiError'

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = await prisma.file.findUnique({
            where: { id: req.params.id }
        })

        if (!file) throw new ApiError(404, 'File not found')

        try {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
        } catch (fsErr) {
            console.warn('Could not remove file from disk', fsErr)
        }

        await prisma.file.delete({ where: { id: file.id } })

        res.json({ message: 'Deleted' })
    } catch (err) {
        next(err)
    }
}