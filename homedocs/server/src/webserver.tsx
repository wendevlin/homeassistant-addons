import { readFile } from 'node:fs/promises'
import { Hono } from 'hono'
import mime from 'mime'
import { buildDocsInOnePage } from './htmlBuilder'
import NotFoundPage from './templates/404'
import environmentVariables from './utils/environmentVariables'

export const webserver = new Hono()

webserver.get('*', async (c) => {
	const path = c.req.path

	const fileName = path.split('/').pop() ?? ''
	let filePath = ''
	if (fileName === 'main.css') {
		filePath = './dist/main.css'
	} else if (fileName === 'robots.txt') {
		filePath = './public/robots.txt'
	} else if (fileName.startsWith('favicon')) {
		filePath = './public/favicon.svg'
	} else if (path === '/html-export') {
		filePath = await buildDocsInOnePage()
	} else if (
		fileName.includes('.') &&
		(fileName.split('.').pop()?.length ?? 0) > 1
	) {
		filePath = `${environmentVariables.docsBasePath}/${path}`
	} else if (path === '/') {
		filePath = './dist/docs/index.html'
	} else {
		filePath = `./dist/docs/${path}.html`
	}

	try {
		const fileContent = await readFile(filePath)

		// Get the MIME type based on the file extension
		const mimeType = mime.getType(filePath) || 'application/octet-stream'

		c.header('Content-Type', mimeType)
		return c.body(fileContent)
	} catch (error) {
		console.error('webserver error')
		console.error(error)
		return c.html(<NotFoundPage path={path} />, 404)
	}
})
