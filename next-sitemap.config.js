/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kerala.no',
  generateRobotsTxt: true,
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
