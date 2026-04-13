import { projectRouter } from './project'
import { settingsRouter } from './settings'
import { router } from '../trpc'

export const appRouter = router({
  project: projectRouter,
  settings: settingsRouter,
})

export type AppRouter = typeof appRouter
