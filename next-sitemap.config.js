const fs = require('fs')
const path = require('path')

const eventsDir = path.join(process.cwd(), 'content', 'events')
const eventImagesDir = path.join(process.cwd(), 'public', 'images', 'events')

function getEventPaths() {
  if (!fs.existsSync(eventsDir)) {
    return []
  }

  return fs
    .readdirSync(eventsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => `/events/${file.replace(/\.md$/, '')}`)
}

// Mirrors the gallery logic in src/lib/events.ts. Keep the two in sync: if you
// add a gallery folder or route segment there, add it here too, otherwise the
// new gallery page will not appear in the sitemap.
const supportedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

const galleryGroups = [
  { routeSegment: 'onam-gatherings', folderCandidates: ['onam'] },
  { routeSegment: 'christmas-gatherings', folderCandidates: ['christmas-diwali', 'christmas', 'xmas'] },
  { routeSegment: 'easter-vishu-eid-gatherings', folderCandidates: ['easter-vishu-eid', 'easte-vishu-eid'] },
  { routeSegment: 'other-activities', folderCandidates: ['other-activities', 'other-acitivites'] },
]

function folderHasSupportedImage(folderName) {
  const galleryDir = path.join(eventImagesDir, folderName)

  if (!fs.existsSync(galleryDir)) {
    return false
  }

  return fs
    .readdirSync(galleryDir)
    .some((file) => supportedImageExtensions.includes(path.extname(file).toLowerCase()))
}

function getGalleryPaths() {
  return galleryGroups
    .filter((group) => group.folderCandidates.some(folderHasSupportedImage))
    .map((group) => `/events/gallery/${group.routeSegment}`)
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kerala.no',
  generateRobotsTxt: true,
  outDir: 'public',
  additionalPaths: async () => {
    const staticPaths = ['/', '/about', '/committee', '/contact', '/events', '/local', '/norway']

    return [...staticPaths, ...getEventPaths(), ...getGalleryPaths()].map((loc) => ({
      loc,
      changefreq: 'weekly',
      priority: loc === '/' ? 1 : 0.7,
    }))
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
