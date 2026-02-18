import { z } from 'zod'

export const createFileSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    owner: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional()
  })
})

export type CreateFileInput = z.infer<typeof createFileSchema>['body']

export const updateFileSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Id is required')
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    owner: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional()
  })
})

export type UpdateFileInput = z.infer<typeof updateFileSchema>['body']
