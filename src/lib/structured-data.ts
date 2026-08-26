import { SITE } from '../config/site'

export interface BreadcrumbItem {
  label: string
  path: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.path, SITE.origin).href,
    })),
  }
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, SITE.origin).href,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.origin}/`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
  }
}
