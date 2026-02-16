import { Request, Response } from 'express'
import { prisma } from "@/prisma/client"

export const download = async (req: Request, res: Response) => {
    const file = await prisma.file.findUnique({
        where: { id: req.params.id }
    })

    if (!file) {
        return res.status(404).json({ message: 'Not found' })
    }

    res.download(file.path, file.originalName)
}