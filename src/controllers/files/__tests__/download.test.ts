import { download } from "../download"
import { prisma } from '@/prisma/client'
import { Request, Response } from 'express'

describe("download", () => {
    it("should download the file if it exists", async () => {
        
        const mockFile = {
            id: "1",
            path: "/path/to/file",
            originalName: "mockFile.pdf"
        }

        prisma.file.findUnique = jest.fn().mockResolvedValue(mockFile)
        const req = {
            params: { id: "1" }
        } as unknown as Request

        const res = {
            download: jest.fn()
        } as unknown as Response
        
        const next = jest.fn()
        expect(await download(req, res, next)).toBeUndefined()

        expect(prisma.file.findUnique).toHaveBeenCalledWith({ where: { id: "1" } })

        expect(res.download).toHaveBeenCalledWith(mockFile.path, mockFile.originalName)
    })
})