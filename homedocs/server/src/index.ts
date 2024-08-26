import { serve } from '@hono/node-server'

import { buildCss } from '../scripts/tailwind'
import { startWatcher } from './fileWatcher'
import logger from './utils/logger'
import { webserver } from './webserver'

startWatcher()

serve({
	hostname: '0.0.0.0',
	fetch: webserver.fetch,
	port: 3000,
})

logger.info(' Server is running at port 3000')
