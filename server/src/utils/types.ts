export type MarkdownPath = {
  folder: string
  fileName: string
}

export type NavigationEntry = {
  mainIndex?: boolean,
  htmlContent?: string,
  title: string,
  path?: string,
  children?: NavigationEntry[],
  pathPrefix?: string,
}