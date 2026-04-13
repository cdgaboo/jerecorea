import { z } from 'zod'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/db'
import { publicProcedure, router } from '../trpc'

const settingsSchema = z.object({
  siteName: z.string().default('jerecorea'),
  tagline: z.string().optional(),
  aboutText: z.string().optional(),
  socialLinks: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
})

export const settingsRouter = router({
  get: publicProcedure.query(async () => {
    await connectDB()
    const db = (await mongoose.connect(process.env.MONGODB_URI!)).connection.db!
    const exists = await db.collection('settings').findOne({})
    if (!exists) return settingsSchema.parse({})
    return settingsSchema.parse(exists)
  }),

  save: publicProcedure.input(settingsSchema).mutation(async ({ input }) => {
    await connectDB()
    const db = (await mongoose.connect(process.env.MONGODB_URI!)).connection.db!
    await db.collection('settings').updateOne({}, { $set: input }, { upsert: true })
    return input
  }),
})
