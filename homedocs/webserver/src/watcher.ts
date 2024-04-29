import { type FSWatcher, watch } from 'node:fs'
import { triggerBuild } from './build'
import environmentVariables from './utils/environmentVariables'

let timeout: Timer | null = null
let docsWatcher: FSWatcher | null = null
let filesWatcher: FSWatcher | null = null

const setBuildTimeout = () => {
  if (timeout) {
    clearTimeout(timeout)
    console.log('⏰ Canceled previous timeout')
  }

  console.log(
    `⏰ Next build will start in ${environmentVariables.buildTimeoutInSeconds}s`,
  )
  timeout = setTimeout(() => {
    triggerBuild()
  }, Number(environmentVariables.buildTimeoutInSeconds) * 1000)
}

const onChange = (event: string, filename: string | null) => {
  console.log(`🔍 Detected ${event} in ${filename}`)

  setBuildTimeout()
}

export const startWatcher = () => {
  docsWatcher = watch(
    environmentVariables.docsPath ?? '',
    { recursive: true },
    onChange,
  )
  console.log(`👀 Watching ${environmentVariables.docsPath} for changes`)
  filesWatcher = watch(
    environmentVariables.filesPath ?? '',
    { recursive: true },
    onChange,
  )
  console.log(`👀 Watching ${environmentVariables.filesPath} for changes`)
}

export const stopWatcher = () => {
  if (docsWatcher) {
    docsWatcher.close()
    console.log(
      '🙈 stopped watching ${environmentVariables.docsPath} for changes',
    )
  }
  if (filesWatcher) {
    filesWatcher.close()
    console.log(
      '🙈 stopped watching ${environmentVariables.filesPath} for changes',
    )
  }
}
