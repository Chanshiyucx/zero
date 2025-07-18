import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.webserver.host}/sitemap.xml`,
  }
}
