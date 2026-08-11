import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale } from './i18n'
import { getDateLocale } from './i18n'

const EVENTS_DIR = path.join(process.cwd(), 'content', 'events')
const EVENT_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'events')

const supportedEventImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const preferredGalleryCoverBaseNames = new Set(['cover', 'thumbnail', 'thumb'])

export type EventGalleryGroupKey = 'onam' | 'christmas' | 'easterVishuEid' | 'otherActivities'

const galleryGroupFolderCandidates: Record<EventGalleryGroupKey, string[]> = {
  onam: ['onam'],
  christmas: ['christmas-diwali', 'christmas', 'xmas'],
  easterVishuEid: ['easter-vishu-eid', 'easte-vishu-eid'],
  otherActivities: ['other-activities', 'other-acitivites'],
}

const galleryGroupAltPrefixes: Record<EventGalleryGroupKey, string> = {
  onam: 'Onam gathering',
  christmas: 'Christmas and Diwali gathering',
  easterVishuEid: 'Easter, Vishu, and Eid gathering',
  otherActivities: 'ARK community activity',
}

export interface EventFrontmatter {
  title: string
  date: string
  venue: string
  category: string
  featured?: boolean
  excerpt: string
}

export interface ARKEvent extends EventFrontmatter {
  slug: string
  content: string
}

export interface ARKEventGalleryImage {
  src: string
  alt: string
}

export interface EventGalleryGroup {
  key: EventGalleryGroupKey
  folderName: string
  routeSegment: string
  images: ARKEventGalleryImage[]
}

const galleryGroupRouteSegments: Record<EventGalleryGroupKey, string> = {
  onam: 'onam-gatherings',
  christmas: 'christmas-gatherings',
  easterVishuEid: 'easter-vishu-eid-gatherings',
  otherActivities: 'other-activities',
}

function readGalleryImagesFromFolder(folderName: string, altPrefix: string): ARKEventGalleryImage[] {
  const galleryDir = path.join(EVENT_IMAGES_DIR, folderName)

  if (!fs.existsSync(galleryDir)) {
    return []
  }

  return fs
    .readdirSync(galleryDir)
    .filter((file) => supportedEventImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const aBaseName = path.parse(a).name.toLowerCase()
      const bBaseName = path.parse(b).name.toLowerCase()
      const aIsPreferredCover = preferredGalleryCoverBaseNames.has(aBaseName)
      const bIsPreferredCover = preferredGalleryCoverBaseNames.has(bBaseName)

      if (aIsPreferredCover !== bIsPreferredCover) {
        return aIsPreferredCover ? -1 : 1
      }

      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    })
    .map((file, index) => ({
      src: `/images/events/${folderName}/${file}`,
      alt: `${altPrefix} photo ${index + 1}`,
    }))
}

function findGalleryFolderName(key: EventGalleryGroupKey): string | null {
  return galleryGroupFolderCandidates[key].find((folderName) =>
    fs.existsSync(path.join(EVENT_IMAGES_DIR, folderName))
  ) ?? null
}

export function parseEventDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

// Fails the build on a bad `date:` value instead of publishing a page that
// silently reads "Invalid Date". The message names the file so a non-technical
// maintainer can find and fix it. See docs/project-handover.md.
function assertValidEventDate(dateString: unknown, fileName: string): string {
  if (typeof dateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error(
      `Invalid "date" in content/events/${fileName}: got ${JSON.stringify(dateString)}. ` +
        'Use the format YYYY-MM-DD, in quotes — for example date: "2027-04-14".'
    )
  }

  const [year, month, day] = dateString.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))

  // Catches dates that match the pattern but do not exist, e.g. 2026-13-45 or 2027-02-30.
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Invalid "date" in content/events/${fileName}: ${dateString} is not a real calendar date.`
    )
  }

  return dateString
}

export function formatEventDateForLocale(dateString: string, locale: Locale): string {
  return parseEventDate(dateString).toLocaleDateString(getDateLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatEventMonthForLocale(dateString: string, locale: Locale): string {
  return parseEventDate(dateString).toLocaleDateString(getDateLocale(locale), {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function getLocalizedEventCategory(
  category: string,
  locale: Locale,
  categories: Record<string, string>,
  fallback: string
): string {
  if (locale === 'en') {
    return category
  }

  return categories[category] ?? fallback
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
      const frontmatter = data as EventFrontmatter

      assertValidEventDate(frontmatter.date, file)

      return {
        slug,
        content,
        ...frontmatter,
      }
    })
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
}

export function getEventBySlug(slug: string): ARKEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function getAllEventGalleryGroups(): EventGalleryGroup[] {
  const orderedKeys: EventGalleryGroupKey[] = ['onam', 'christmas', 'easterVishuEid', 'otherActivities']

  return orderedKeys.flatMap((key) => {
    const folderName = findGalleryFolderName(key)

    if (!folderName) {
      return []
    }

    const altPrefix = galleryGroupAltPrefixes[key]

    const images = readGalleryImagesFromFolder(folderName, altPrefix)

    if (images.length === 0) {
      return []
    }

    return [{ key, folderName, routeSegment: galleryGroupRouteSegments[key], images }]
  })
}

export function getEventGalleryGroupByRouteSegment(routeSegment: string): EventGalleryGroup | null {
  return getAllEventGalleryGroups().find((group) => group.routeSegment === routeSegment) ?? null
}

export function getUpcomingEvents(): ARKEvent[] {
  const today = new Date()
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return getAllEvents().filter((e) => parseEventDate(e.date).getTime() >= todayUtc)
}

/**
 * Upcoming events for the homepage preview.
 *
 * `featured: true` in an event's frontmatter pulls it to the front, so the
 * committee can lead with the big one (Onam) even when a smaller event happens
 * sooner. Within each group events stay in date order, soonest first.
 */
export function getFeaturedUpcomingEvents(limit: number): ARKEvent[] {
  const upcoming = getUpcomingEvents()

  return [
    ...upcoming.filter((event) => event.featured === true),
    ...upcoming.filter((event) => event.featured !== true),
  ].slice(0, limit)
}

export function getPastEvents(): ARKEvent[] {
  const today = new Date()
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return getAllEvents().filter((e) => parseEventDate(e.date).getTime() < todayUtc)
}
