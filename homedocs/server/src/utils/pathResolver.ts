import type { MarkdownPath } from './types'

export const splitPaths = (path: string): MarkdownPath => {
  if (path === '/') {
    return {
      folder: '',
      fileName: 'index.md',
    }
  }
  const parts = path.split('/').slice(1)
  return {
    fileName: `${parts.pop()}.md`,
    folder: parts.join('/'),
  }
}