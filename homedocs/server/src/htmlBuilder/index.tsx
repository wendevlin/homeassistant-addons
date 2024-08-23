import { appendFile, writeFile } from 'node:fs/promises'
import { rimraf } from 'rimraf'
import Layout from '../templates/layout'
import layoutBottom from '../templates/merged/layoutBottom'
import layoutTop from '../templates/merged/layoutTop'
import Page from '../templates/merged/page'
import { Navigation } from '../templates/navigation'
import environmentVariables from '../utils/environmentVariables'
import { safeWriteFileToPath } from '../utils/file'
import logger from '../utils/logger'
import { generateNavForFolder } from './navigation'
import type { Breadcrumb, NavigationEntry } from './types'

const MERGED_DOC_PATH = './dist/mergedDocs.html'

const buildHtml = async (
	navigationEntry: NavigationEntry,
	fullNavigationStructure: NavigationEntry[],
) => {
	const html = (
		<Layout
			pathPrefix={navigationEntry.pathPrefix!}
			content={navigationEntry.htmlContent!}
		>
			<Navigation
				navigation={fullNavigationStructure}
				pathPrefix={navigationEntry.pathPrefix!}
				active={navigationEntry}
			/>
		</Layout>
	)

	const fileName = `./dist/docs/${navigationEntry.path || 'index'}.html`

	await safeWriteFileToPath(fileName, `<!doctype html>${html}`)
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
	await rimraf('./dist/docs')

	await buildLevel(navigationStructure, navigationStructure)
}

const buildLevelInOnePage = async (
	navigationStructure: NavigationEntry[],
	breadcrumbs: Breadcrumb[] = [],
) => {
	for (const navigationEntry of navigationStructure) {
		if (typeof navigationEntry.htmlContent === 'string') {
			const renderedPage = (
				<Page
					content={navigationEntry.htmlContent}
					breadcrumbs={[
						...breadcrumbs,
						{
							name: navigationEntry.title,
							isFolder: false,
						},
					]}
				/>
			)

			await appendFile(MERGED_DOC_PATH, renderedPage.toString())
		}

		if (navigationEntry.children) {
			await buildLevelInOnePage(navigationEntry.children, [
				...breadcrumbs,
				{
					name: navigationEntry.title,
					isFolder: navigationEntry.htmlContent === undefined,
				},
			])
		}
	}
}

export const buildDocsInOnePage = async () => {
	const navigationStructure = await generateNavForFolder(
		environmentVariables.docsBasePath,
	)

	await rimraf(MERGED_DOC_PATH)

	await safeWriteFileToPath(MERGED_DOC_PATH, '<!doctype html>')

	await appendFile(MERGED_DOC_PATH, layoutTop)

	await buildLevelInOnePage(navigationStructure)

	await appendFile(MERGED_DOC_PATH, layoutBottom)

	return MERGED_DOC_PATH
}
