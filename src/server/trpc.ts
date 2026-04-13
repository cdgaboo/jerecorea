import { initTRPC } from '@trpc/server'
import { connectDB } from '@/lib/db'

export const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
