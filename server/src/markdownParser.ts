import { BunFile } from 'bun';
import markdownit from 'markdown-it'
import frontmatter from 'markdown-it-front-matter'

const extractFrontmatter = (frontmatter: any, env: any) => {
  if (frontmatter.title) {
    titles[env.filename] = frontmatter.title
  }
}

const md = markdownit({
  linkify: true,
})
.use(frontmatter, extractFrontmatter)

const titles: Record<string, string> = {}

const parseFile = async (filename: string, file: BunFile) => {
  const markdownContent = await file.text()
  const htmlContent = md.render(markdownContent, {
    filename,
  })
  return {
    title: titles[filename] ?? file.name,
    content: htmlContent,
  }
}

export default parseFile