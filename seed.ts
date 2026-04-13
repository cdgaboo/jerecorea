import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve(process.cwd(), '.env.local') })
import mongoose from 'mongoose'

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!)

  const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({
    title: String, slug: String, subtitle: String, description: String, imageUrl: String, externalUrl: String, order: Number, featured: Boolean,
  }, { timestamps: true }))

  const existing = await Project.countDocuments()
  if (existing === 0) {
    await Project.create({
      title: 'Proyecto de ejemplo',
      slug: 'proyecto-ejemplo',
      subtitle: 'Diseño y desarrollo web',
      description: 'Proyecto de muestra. Edítalo o elimínalo desde el panel de administración.',
      order: 1,
      featured: true,
    })
    console.log('Created sample project')
  }

  const settingsExist = await mongoose.connection.db?.collection('settings').findOne({})
  if (!settingsExist) {
    await mongoose.connection.db?.collection('settings').insertOne({
      siteName: 'jerecorea',
      tagline: 'Diseño y desarrollo creativo',
      aboutText: 'Desarrollador y diseñador creativo enfocado en construir experiencias digitales con atención al detalle.\n\nMe apasiona el diseño minimalista, la tipografía y los proyectos que desafían lo convencional.',
      socialLinks: [
        { label: 'GitHub', url: 'https://github.com/cdgaboo' },
        { label: 'Instagram', url: 'https://instagram.com' },
        { label: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    })
    console.log('Created settings')
  }

  console.log('Seed complete')
  process.exit(0)
}

seed()
