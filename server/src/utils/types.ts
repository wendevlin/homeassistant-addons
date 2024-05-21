export type MarkdownPath = {
  folder: string
  fileName: string
}

export type NavigationEntry = {
  title: string,
  path?: string,
  children: NavigationEntry[]
}