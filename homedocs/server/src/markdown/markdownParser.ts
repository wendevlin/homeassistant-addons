import markdownit from 'markdown-it'
import type Markdownit from 'markdown-it'
import { full as emoji } from 'markdown-it-emoji'
import { frontMatterPlugin } from './frontMatterPlugin'

export interface MarkdownIt extends Markdownit {
	frontMatterData?: {
		title?: string
	}
}

const md = markdownit({
	linkify: true,
	html: true,
})
	.use(emoji)
	.use(frontMatterPlugin) as MarkdownIt

export const parseFile = async (filePath: string, filename: string) => {
	const markdownContentFile = Bun.file(filePath)
	const markdownContent = await markdownContentFile.text()
	const htmlContent = md.render(markdownContent, { filePath })

	let title = filename

	if (title.endsWith('.md')) {
		title =
			filePath === 'docs/index.md'
				? 'Homedocs'
				: filename.substring(0, filename.length - 3)
	}

	if (md.frontMatterData?.title) {
		title = md.frontMatterData.title
	}
	md.frontMatterData = {} // reset frontmatter data

	return {
		title,
		content: htmlContent,
	}
}
