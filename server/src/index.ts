import { buildCss } from './utils/tailwind'
import { Elysia } from 'elysia'
import { splitPaths } from "./utils/pathResolver";
import { file } from "bun";
import { html } from '@elysiajs/html'
import markdownParser from './markdownParser'
import jsxContent from './templates/content'

// 2 parts
// 1. markdown to html watcher
// 2. webserver

// 1. markdown files werden in html umgewandelt mit markdown-it oder remark
// 1. dann wird html in vue file integriert und gebaut
// 1. alles muss relative parts haben, css gibt es nur im root und wirkt korrekt relativ aufgelöst
// 1. bilder werden dazu kopiert und relativ verlinkt

const DOCS_BASE_PATH = 'docs'

await buildCss()

const app = new Elysia()
  .use(html())
  .get(
    '*',
    async ({ path, set }) => {
      if (path.endsWith('main.css')) {
        set.headers["content-type"] = "text/css";
        return Bun.file('./dist/main.css')
      }

      const paths = splitPaths(path)
      const markdownFile = file(`${DOCS_BASE_PATH}/${paths.folder}/${paths.fileName}`)

      if (!await markdownFile.exists()) {
        set.status = 404
        return `${path} has no markdown file`
      } else {
        const markdown = await markdownParser(paths.fileName, markdownFile)

			  set.headers["content-type"] = 'text/html; charset=utf8'
        return jsxContent(markdown.title, markdown.content)
      }
    }
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
