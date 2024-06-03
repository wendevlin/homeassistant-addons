import { $, FileSink } from 'bun'
import layout from '../templates/layout'
import { generateNavigation } from '../templates/navigation'
import environmentVariables from '../utils/environmentVariables'
import { generateNavForFolder } from './navigation'
import type { Breadcrumb, NavigationEntry } from './types'
import layoutTop from '../templates/merged/layoutTop'
import layoutBottom from '../templates/merged/layoutBottom'
import page from '../templates/merged/page'
import logger from '../utils/logger'

const buildHtml = async (
	navigationEntry: NavigationEntry,
	fullNavigationStructure: NavigationEntry[],
) => {
	const html = layout(
		navigationEntry.title,
		navigationEntry.htmlContent!,
		generateNavigation(
			fullNavigationStructure,
			navigationEntry.pathPrefix!,
			navigationEntry,
		),
		navigationEntry.pathPrefix!,
	).toString()
	const fileName = `./dist/docs/${navigationEntry.path || 'index'}.html`
	await Bun.write(fileName, `<!doctype html>${html}`)
	logger.info(`Built ${fileName}`)
}

const buildLevel = async (
	navigationStructure: NavigationEntry[],
	fullNavigationStructure: NavigationEntry[],
) => {
	for (const navigationEntry of navigationStructure) {
		if (typeof navigationEntry.htmlContent === 'string') {
			await buildHtml(navigationEntry, fullNavigationStructure)
		}

		if (navigationEntry.children) {
			await buildLevel(navigationEntry.children, fullNavigationStructure)
		}
	}
}

export const buildDocs = async () => {
	const navigationStructure = await generateNavForFolder(
		environmentVariables.docsBasePath,
	)

	// remove old files
	await $`rm -rf ./dist/docs`.quiet()

	await buildLevel(navigationStructure, navigationStructure)
}

const buildLevelInOnePage = (
	writer: FileSink,
	navigationStructure: NavigationEntry[],
	breadcrumbs: Breadcrumb[] = [],
) => {
	for (const navigationEntry of navigationStructure) {
		if (typeof navigationEntry.htmlContent === 'string') {
			writer.write(page(
				navigationEntry.title,
				navigationEntry.htmlContent,
				[
					...breadcrumbs,
					{
						name: navigationEntry.title,
						isFolder: false,
					},
				],
			).toString())
			writer.flush()
		}

		if (navigationEntry.children) {
			buildLevelInOnePage(
				writer,
				navigationEntry.children,
				[
					...breadcrumbs,
					{
						name: navigationEntry.title,
						isFolder: navigationEntry.htmlContent === undefined,
					},
				],
			)
		}
	}
}

export const buildDocsInOnePage = async () => {
	const navigationStructure = await generateNavForFolder(
		environmentVariables.docsBasePath,
	)

	await Bun.$`rm ./dist/mergedDocs.html`.quiet()

	const file = Bun.file('./dist/mergedDocs.html')
	const writer = file.writer();

	writer.write(layoutTop)
	writer.flush()

	buildLevelInOnePage(writer, navigationStructure)

	writer.write(layoutBottom)
	writer.flush()
	writer.end()

	return file
}

await buildDocsInOnePage()