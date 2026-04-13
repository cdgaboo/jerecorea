import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import Link from 'next/link'

export default async function AdminDashboard() {
  await connectDB()
  const [projectCount] = await Promise.all([
    Project.countDocuments(),
  ])

  return (
    <div>
      <h1 className="font-mono text-xl mb-8">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="border border-border p-6">
          <p className="font-mono text-3xl">{projectCount}</p>
          <p className="text-sm text-muted mt-1">Proyectos</p>
        </div>
      </div>
    </div>
  )
}
