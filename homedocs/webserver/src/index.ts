import { buildDocs } from './build'
import { startServer } from './server'
import { startWatcher } from './watcher'

// run initial build
await buildDocs()

// start webserver
const server = await startServer(4321)
const serverAddress: string = server.server?.url.toString() ?? '--unknown--'
console.log(`🏠📃 Webserver is running at ${serverAddress}`)

// start file watcher
startWatcher()
