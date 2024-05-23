import { readFile } from 'node:fs/promises';
import markdownit from 'markdown-it'
import type Markdownit from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import { frontMatterPlugin } from './frontMatterPlugin';

export interface MarkdownIt extends Markdownit {
  frontMatter?: {
    title?: string
  }
}

const md = markdownit({
  linkify: true,
})
  .use(emoji)
  .use(frontMatterPlugin) as MarkdownIt


export const parseFile = async (filePath: string, filename: string) => {
  const markdownContent= await readFile(filePath, 'utf-8')
  const htmlContent = md.render(markdownContent, { filePath })

  let title = filePath === 'index.md' ? 'Homedocs' : filename.substring(0, filename.length - 3)
  if (md.frontMatter?.title) {
    title = md.frontMatter.title
  }

  return {
    title,
    content: htmlContent,
  }
}