import { view } from '../view'
import { createReq, createRes, createNext, mockPrisma, mockFileRecord } from '@/tests/testUtils'

describe('view', () => {
  const next = createNext()

  beforeEach(() => jest.resetAllMocks())

  it('sends file when exists', async () => {
    const prismaFile = mockPrisma()
    const mock = mockFileRecord()
    prismaFile.findUnique.mockResolvedValue(mock)

    const req = createReq({ params: { id: '1' } } as any)
    const res = createRes()

    await view(req as any, res as any, next)

    expect(prismaFile.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
    expect(res.sendFile).toHaveBeenCalled()
  })
})
