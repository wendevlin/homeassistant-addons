export type MarkdownPath = {
  folder: string
  fileName: string
}

export type NavigationEntry = {
  mainIndex?: boolean,
  title: string,
  path?: string,
  children?: NavigationEntry[]
}