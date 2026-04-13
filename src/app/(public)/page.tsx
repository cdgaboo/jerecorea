import { connectDB } from '@/lib/db'
import { Project } from '@/lib/models'
import ProjectCard from '@/components/ProjectCard'
import Image from 'next/image'

export default async function HomePage() {
  await connectDB()
  const projects = await Project.find().sort({ order: 1 }).lean()

  return (
    <>
      <div className="mb-12">
        <h1 className="font-mono text-xl">jerecorea</h1>
        <p className="mt-2 text-sm text-muted max-w-xl">Diseño y desarrollo creativo</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(projects as any[]).map((p) => (
            <ProjectCard key={String(p._id)} project={p} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <Image src="/iconmonstr-plus-square-multiple-filled.svg" alt="" width={48} height={48} className="mx-auto opacity-20 mb-4" />
          <p className="font-mono text-sm text-muted">Sin proyectos aún</p>
        </div>
      )}
    </>
  )
}
