import chokidar from "chokidar";
import { buildDocs } from "./htmlBuilder";
import environmentVariables from "./utils/environmentVariables";

let timeout: Timer | null = null

const triggerNewBuild = async () => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(
    async () => {
      console.log('Triggering new build')
      await buildDocs()
      console.log('Docs rebuilt')
    },
    1000
  )
}

export const startWatcher = () => {
  chokidar.watch(environmentVariables.docsBasePath).on('all', (event, path) => {
    // TODO do not rebuild everything, only if needed
    triggerNewBuild()
  })
  console.log('Watcher started')
}