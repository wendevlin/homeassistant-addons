import { stat } from 'node:fs/promises'
import { glob } from 'glob'
import { parseFile } from '../markdown/markdownParser'
import type { NavigationEntry } from './types'

export const generateNavForFolder = async (
	folder: string,
	pathPrefix = '',
): Promise<NavigationEntry[]> => {
	const level: NavigationEntry[] = []
	const filesAndFolders = await glob('*', {
		cwd: folder,
	})

	for (const fileOrFolder of filesAndFolders) {
		const stats = await stat(`${folder}/${fileOrFolder}`)
		if (stats.isDirectory()) {
			const children = await generateNavForFolder(
				`${folder}/${fileOrFolder}`,
				`${pathPrefix}${fileOrFolder}/`,
			)
			if (children.length > 0) {
				const index = children.findIndex(
					(child) => child.subIndex && child.path !== undefined,
				)
				if (index > -1) {
					const indexChild = children[index]
					// const { title, content } = await parseFile(`${folder}/${fileOrFolder}/index.md`, fileOrFolder)

					const path = indexChild.path!

					children.splice(index, 1)

					level.push({
						title: indexChild.title ?? fileOrFolder,
						path,
						children,
						htmlContent: indexChild.htmlContent,
						pathPrefix: `${!path.includes('/') ? '.' : ''}${path
							.split('/')
							.slice(0, -1)
							.map(() => '..')
							.join('/')}/`,
					})
				} else {
					level.push({
						title: fileOrFolder,
						children,
					})
				}
			}
		} else if (fileOrFolder.endsWith('.md')) {
			const { title, content } = await parseFile(
				`${folder}/${fileOrFolder}`,
				fileOrFolder,
			)
			// TODO generate html for content and reference it
			const fileName = fileOrFolder.substring(0, fileOrFolder.length - 3)
			let path = `${pathPrefix}${fileName}`
			const mainIndex = !pathPrefix && fileOrFolder === 'index.md'

			if (fileName === 'index' && !pathPrefix) {
				path = ''
			} else if (fileName === 'index') {
				path = pathPrefix.substring(0, pathPrefix.length - 1)
			}
			// TODO add relative path to be used in generating navigation
			level.push({
				mainIndex,
				subIndex: fileName === 'index',
				title,
				path,
				children: [],
				htmlContent: content,
				pathPrefix: `${!path.includes('/') ? '.' : ''}${path
					.split('/')
					.slice(0, -1)
					.map(() => '..')
					.join('/')}/`,
			})
		}
	}
	return level
		.sort((a, b) => {
			if (a.mainIndex) {
				return -1
			} else if (b.mainIndex) {
				return 1
			} else {
				return a.title.localeCompare(b.title)
			}
		})
		.map(({ mainIndex, children, ...rest }) => {
			if (!children?.length) {
				return rest
			} else {
				return {
					...rest,
					children,
				}
			}
		})
}
