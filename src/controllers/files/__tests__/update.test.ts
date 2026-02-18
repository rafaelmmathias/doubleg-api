import { update } from '../update'
import { createReq, createRes, createNext, mockPrisma, mockFileRecord } from '@/tests/testUtils'

describe('update', () => {
  const next = createNext()

  beforeEach(() => jest.resetAllMocks())

  it('updates existing file and returns updated record', async () => {
    const prismaFile = mockPrisma()
    const mock = mockFileRecord()
    prismaFile.findUnique.mockResolvedValue(mock)
    prismaFile.update.mockResolvedValue({ ...mock, name: 'new name' })

    const req = createReq({ params: { id: '1' }, body: { name: 'new name' } } as any)
    const res = createRes()

    await update(req as any, res as any, next)

    expect(prismaFile.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
    expect(prismaFile.update).toHaveBeenCalled()
    expect((res.json as jest.Mock).mock.calls[0][0].name).toBe('new name')
  })
})
