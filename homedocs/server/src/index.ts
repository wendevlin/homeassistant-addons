import { buildCss } from '../scripts/tailwind'
import { startWatcher } from './fileWatcher'
import logger from './utils/logger'
import { webserver } from './webserver'

// 2 parts
// 1. markdown to html watcher
// 2. webserver

// 1. markdown files werden in html umgewandelt mit markdown-it oder remark
// 1. dann wird html in vue file integriert und gebaut
// 1. alles muss relative parts haben, css gibt es nur im root und wirkt korrekt relativ aufgelöst
// 1. bilder werden dazu kopiert und relativ verlinkt

// if dev mode only rebuild css
if (process.env.NODE_ENV !== 'production') {
	logger.info('Homedocs is running in development mode')
	await buildCss()
	logger.info('Css built')
}

startWatcher()
// await buildDocs()
// logger.info('Initial docs built')

webserver.listen(3000)

logger.info(`🦊 Elysia is running at ${webserver.server?.url}`)
