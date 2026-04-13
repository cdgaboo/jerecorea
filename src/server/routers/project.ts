import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import { publicProcedure, router } from '../trpc'

export const projectRouter = router({
  list: publicProcedure.query(async () => {
    await connectDB()
    return Project.find().sort({ order: 1 }).lean()
  }),

  get: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    await connectDB()
    return Project.findOne({ slug: input.slug }).lean()
  }),

  create: publicProcedure.input(z.object({
    title: z.string(),
    slug: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    externalUrl: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  })).mutation(async ({ input }) => {
    await connectDB()
    return Project.create(input)
  }),

  update: publicProcedure.input(z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    externalUrl: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  })).mutation(async ({ input }) => {
    await connectDB()
    const { id, ...data } = input
    return Project.findByIdAndUpdate(id, data, { new: true }).lean()
  }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await connectDB()
    return Project.findByIdAndDelete(input.id)
  }),
})
