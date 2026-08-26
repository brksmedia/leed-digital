const SAFE_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function assertSafeSegments(value: string, label: string) {
  const segments = value.split('/')
  if (segments.length === 0 || segments.some((segment) => !SAFE_SEGMENT.test(segment))) {
    throw new Error(`${label} inválido: use somente a-z, 0-9 e hífen em cada segmento`)
  }
  return segments
}

export function insightIdFromEntry(entry: string) {
  if (!entry.endsWith('.md')) throw new Error('Entrada de insight inválida: extensão .md obrigatória')
  return assertSafeSegments(entry.slice(0, -3), 'Nome de insight').join('/')
}

export function insightPathFromId(id: string) {
  return `/insights/${assertSafeSegments(id, 'ID de insight').join('/')}/`
}

export function insightUrlFromId(id: string, origin = 'https://leed.digital') {
  return new URL(insightPathFromId(id), origin).href
}
