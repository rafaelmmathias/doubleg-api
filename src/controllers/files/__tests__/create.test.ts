import { create } from '../create'
import { createReq, createRes, createNext, mockPrisma, mockFileRecord } from '@/tests/testUtils'
import fs from 'fs'
import path from 'path'

jest.mock('fs')

describe('create', () => {
  const next = createNext()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns 400 when no file provided', async () => {
    const req = createReq()
    const res = createRes()

    await create(req as any, res as any, next)

    expect(next).toHaveBeenCalled()
  })

  it('creates file when not existing', async () => {
    const prismaFile = mockPrisma()
    const mock = mockFileRecord()
    prismaFile.findUnique.mockResolvedValue(null)
    prismaFile.create.mockResolvedValue(mock)

    const req = createReq({ file: { path: '/tmp/tmpfile', originalname: 'file.bin', mimetype: 'application/octet-stream', size: 100 } } as any)
    const res = createRes()

    // stub service functions used by controller
    jest.spyOn(require('@/services/file.service'), 'generateHash').mockReturnValue('hash123')
    jest.spyOn(require('@/services/file.service'), 'moveToFinalPath').mockReturnValue('/final/hash123.bin')

    await create(req as any, res as any, next)

    expect(prismaFile.findUnique).toHaveBeenCalled()
    expect(prismaFile.create).toHaveBeenCalled()
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(201)
  })
})
