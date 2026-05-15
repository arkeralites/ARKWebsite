const fs = require('fs')
const path = require('path')

const eventsDir = path.join(process.cwd(), 'content', 'events')

function getEventPaths() {
  if (!fs.existsSync(eventsDir)) {
    return []
  }

  return fs
    .readdirSync(eventsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => `/events/${file.replace(/\.md$/, '')}`)
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kerala.no',
  generateRobotsTxt: true,
  outDir: 'public',
  additionalPaths: async () => {
    const staticPaths = ['/', '/about', '/committee', '/contact', '/events', '/local', '/norway']

    return [...staticPaths, ...getEventPaths()].map((loc) => ({
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
