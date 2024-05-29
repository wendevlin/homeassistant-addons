import type { BunFile } from 'bun'
import { Elysia } from 'elysia'
import environmentVariables from './utils/environmentVariables'

export const webserver = new Elysia({
	serve: {
		hostname: '0.0.0.0',
	},
})
	.get('*', async ({ path, set }) => {
		const status = 200
		let responseData: BunFile | string = `${path} not found` // TODO return styled 404 page

		const fileName = path.split('/').pop() ?? ''
		if (fileName === 'main.css') {
			set.headers['content-type'] = 'text/css'
			return Bun.file('./dist/main.css')
		} else if (fileName === 'favicon.svg') {
			return Bun.file('./public/favicon.svg')
		} else if (
			fileName.includes('.') &&
			(fileName.split('.').pop()?.length ?? 0) > 1
		) {
			const file = Bun.file(`${environmentVariables.docsBasePath}/${path}`)
			if (!(await file.exists())) {
				console.log('not found', `${environmentVariables.docsBasePath}/${path}`)
				set.status = 404
			}
			responseData = file
			set.headers['content-type'] = file.type
		} else {
			let htmlFile = Bun.file(`./dist/docs/${path}.html`)

			if (!(await htmlFile.exists())) {
				htmlFile = Bun.file(`./dist/docs/${path}/index.html`)
				if (!(await htmlFile.exists())) {
					set.status = 404
				} else {
					responseData = htmlFile
					set.headers['content-type'] = htmlFile.type
				}
			} else {
				responseData = htmlFile
				set.headers['content-type'] = htmlFile.type
			}
		}

		set.status = status

		set.headers['content-type'] = 'text/html'
		return responseData
	})
	.onError(({ error, code }) => {
		console.log('error')
		console.error(error)
	})
