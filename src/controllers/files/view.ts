import { Request, Response } from 'express'
import { prisma } from "@/prisma/client"
import path from 'path'

export const view = async (req: Request, res: Response) => {
    const file = await prisma.file.findUnique({
        where: { id: req.params.id }
    })

    if (!file) {
        return res.status(404).json({ message: 'Not found' })
    }

    res.sendFile(path.resolve(file.path))
}