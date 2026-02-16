import { Request, Response } from 'express'
import { prisma } from "@/prisma/client"
import fs from 'fs'

export const remove = async (req: Request, res: Response) => {
    const file = await prisma.file.findUnique({
        where: { id: req.params.id }
    })

    if (!file) return res.status(404).json({ message: 'Not found' })

    fs.unlinkSync(file.path)
    await prisma.file.delete({ where: { id: file.id } })

    res.json({ message: 'Deleted' })
}