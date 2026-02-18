import { prisma } from '@/prisma/client'

// Reset all jest mocks between tests
beforeEach(() => {
  jest.resetAllMocks()
})

// Helper to reset prisma mocks
export const resetPrismaMocks = () => {
  // Replace known methods with jest.fn if not present
  const file = (prisma as any).file || {}
  file.findUnique = file.findUnique ?? jest.fn()
  file.findMany = file.findMany ?? jest.fn()
  file.create = file.create ?? jest.fn()
  file.update = file.update ?? jest.fn()
  file.delete = file.delete ?? jest.fn()
  ;(prisma as any).file = file
}

export default undefined
