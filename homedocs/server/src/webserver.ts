import type { BunFile } from 'bun'
import { Elysia } from 'elysia'
import notFoundPage from './templates/404'
import environmentVariables from './utils/environmentVariables'
import { buildDocsInOnePage } from './htmlBuilder'

export const webserver = new Elysia({
	serve: {
		hostname: '0.0.0.0',
	},
}).get('*', async ({ path, set }) => {
	let status = 200
	let responseData: BunFile | string | Promise<string> = ''

	const fileName = path.split('/').pop() ?? ''
	if (fileName === 'main.css') {
		return Bun.file('./dist/main.css')
	}	else if (fileName === 'robots.txt') {
		return Bun.file('./public/robots.txt')
	} else if (fileName.startsWith('favicon')) {
		return Bun.file('./public/favicon.svg')
	} else if (path === '/html-export') {
		return buildDocsInOnePage()
	} else if (
		fileName.includes('.') &&
		(fileName.split('.').pop()?.length ?? 0) > 1
	) {
		const file = Bun.file(`${environmentVariables.docsBasePath}/${path}`)
		if (!(await file.exists())) {
			status = 404
		} else {
			responseData = file
		}
	} else {
		let htmlFile = Bun.file(`./dist/docs/${path}.html`)

		if (!(await htmlFile.exists())) {
			htmlFile = Bun.file(`./dist/docs/${path}/index.html`)
			if (!(await htmlFile.exists())) {
				status = 404
			} else {
				responseData = htmlFile
			}
		} else {
			responseData = htmlFile
		}
	}

	set.status = status

	if (status === 404) {
		responseData = notFoundPage(path)
		set.headers['Content-Type'] = 'text/html'
	}
	return responseData
})
