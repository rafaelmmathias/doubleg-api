import { getList } from '../get-list'
import { createReq, createRes, mockPrisma, mockFileRecord } from '@/tests/testUtils'

describe('getList', () => {
  beforeEach(() => jest.resetAllMocks())

  it('returns files with view path', async () => {
    const prismaFile = mockPrisma()
    const mock = mockFileRecord()
    prismaFile.findMany.mockResolvedValue([mock])

    const req = createReq({ query: {} } as any)
    const res = createRes()

    await getList(req as any, res as any)

    expect(prismaFile.findMany).toHaveBeenCalled()
    expect((res.json as jest.Mock).mock.calls[0][0][0].path).toContain('/api/files/view/')
  })
})
