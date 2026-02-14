/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://expertcv.com',
    generateRobotsTxt: true,
    exclude: ['/dashboard/*', '/editor/*'],
}
