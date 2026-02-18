import { Request, Response } from 'express'
import { prisma } from '@/prisma/client'

export const createReq = (overrides: Partial<Request> = {}): Request => {
  return ({
    params: {},
    body: {},
    query: {},
    file: undefined,
    ...overrides,
  } as unknown) as Request
}

export const createRes = (): Response => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(res as Response)
  res.json = jest.fn().mockReturnValue(res as Response)
  res.download = jest.fn().mockReturnValue(res as any)
  res.sendFile = jest.fn().mockReturnValue(res as any)
  return res as Response
}

export const createNext = () => jest.fn()

export const mockPrisma = () => {
  const file = (prisma as any).file || {}
  file.findUnique = jest.fn()
  file.findMany = jest.fn()
  file.create = jest.fn()
  file.update = jest.fn()
  file.delete = jest.fn()
  ;(prisma as any).file = file
  return file
}

export const mockFileRecord = (overrides: any = {}) => ({
  id: '1',
  path: '/tmp/file.bin',
  originalName: 'file.bin',
  storedName: '1.bin',
  mimeType: 'application/octet-stream',
  size: 100,
  tags: [],
  createdAt: new Date(),
  ...overrides,
})
