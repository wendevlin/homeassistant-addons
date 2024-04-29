import { $, type ShellError } from 'bun'
import environmentVariables from './utils/environmentVariables'

let buildRunning = false
let buildQueued = false

export const triggerBuild = () => {
  if (!buildRunning) {
    buildDocs()
  } else {
    buildQueued = true
  }
}

export const buildDocs = async () => {
  buildRunning = true
  console.time('🚀 build runtime')
  try {
    console.log('🚀 build started')
    await $`cd ../starlight && bun run build --base ${environmentVariables.ingressEntry}`.quiet()
    console.log('🚀 build finished')
    await $`rm -rf ./public`
    await $`cp -r ../starlight/dist ./public`
    console.log('🚀 copied build to public folder')
  } catch (error) {
    console.log('🚫 Build failed')
    try {
      const shellError = error as ShellError
      const output = shellError.stderr.toJSON()
      console.error(output)
    } catch (error) {
      console.error('Failed to parse shell error')
      console.error(error)
    }
  }
  console.timeEnd('🚀 build runtime')
  if (buildQueued) {
    buildQueued = false
    buildDocs()
  } else {
    buildRunning = false
  }
}
