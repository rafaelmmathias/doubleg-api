import { remove } from '../remove'
import { createReq, createRes, createNext, mockPrisma, mockFileRecord } from '@/tests/testUtils'
import fs from 'fs'

jest.mock('fs')

describe('remove', () => {
  const next = createNext()

  beforeEach(() => jest.resetAllMocks())

  it('deletes existing file and returns message', async () => {
    const prismaFile = mockPrisma()
    const mock = mockFileRecord()
    prismaFile.findUnique.mockResolvedValue(mock)
    prismaFile.delete.mockResolvedValue({})

    ;(fs.existsSync as jest.Mock).mockReturnValue(true)

    const req = createReq({ params: { id: '1' } } as any)
    const res = createRes()

    await remove(req as any, res as any, next)

    expect(prismaFile.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
    expect(prismaFile.delete).toHaveBeenCalled()
    expect((res.json as jest.Mock).mock.calls[0][0]).toHaveProperty('message')
  })
})
