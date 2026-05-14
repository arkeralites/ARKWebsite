import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events')

export interface EventFrontmatter {
  title: string
  date: string
  month: string
  venue: string
  category: string
  featured?: boolean
  excerpt: string
}

export interface ARKEvent extends EventFrontmatter {
  slug: string
  content: string
}

export function parseEventDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

export function formatEventDate(dateString: string): string {
  return parseEventDate(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function getAllEvents(): ARKEvent[] {
  if (!fs.existsSync(EVENTS_DIR)) return []

  const files = fs.readdirSync(EVENTS_DIR)

  return files
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(EVENTS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        content,
        ...(data as EventFrontmatter),
      }
    })
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
}

export function getEventBySlug(slug: string): ARKEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function getUpcomingEvents(): ARKEvent[] {
  const today = new Date()
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return getAllEvents().filter((e) => parseEventDate(e.date).getTime() >= todayUtc)
}

export function getPastEvents(): ARKEvent[] {
  const today = new Date()
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return getAllEvents().filter((e) => parseEventDate(e.date).getTime() < todayUtc)
}
