import chokidar from 'chokidar'
import { buildDocs } from './htmlBuilder'
import environmentVariables from './utils/environmentVariables'
import logger from './utils/logger'

let timeout: NodeJS.Timeout | null = null

export const triggerNewBuild = async () => {
	if (timeout) {
		clearTimeout(timeout)
	}

	timeout = setTimeout(async () => {
		logger.info('Change detected')
		await buildDocs()
		logger.info('Docs rebuilt')
	}, 1000)
}

export const startWatcher = () => {
	chokidar.watch(environmentVariables.docsBasePath).on('all', () => {
		// TODO do not rebuild everything, only if needed
		triggerNewBuild()
	})
	logger.info(
		`Watcher started, watching for changes in "${environmentVariables.docsBasePath}" folder`,
	)
}
