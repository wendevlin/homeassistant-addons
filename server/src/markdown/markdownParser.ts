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
  const markdownContentFile= Bun.file(filePath)
  console.log('markdownparse', filePath, filename, await markdownContentFile.exists())
  const markdownContent = await markdownContentFile.text()
  const htmlContent = md.render(markdownContent, { filePath })

  let title = filePath === 'docs/index.md' ? 'Homedocs' : filename.substring(0, filename.length - 3)
  if (md.frontMatter?.title) {
    console.log('markdown frontmatter')
    title = md.frontMatter.title
  }

  return {
    title,
    content: htmlContent,
  }
}