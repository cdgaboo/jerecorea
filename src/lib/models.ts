import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: String,
  description: String,
  titleEn: String,
  subtitleEn: String,
  descriptionEn: String,
  imageUrl: String,
  hoverImageUrl: String,
  externalUrl: String,
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)
