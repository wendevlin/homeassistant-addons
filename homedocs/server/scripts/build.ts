import { build } from 'esbuild'
import logger from "../src/utils/logger"
import { buildCss } from "./tailwind"

// build css with tailwind and daisyui
await buildCss()

logger.info('CSS build finished ✓')

// build the server
const buildOutput = await build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.cjs',
  platform: 'node',
  bundle: true,
})

buildOutput.errors.forEach(error => {
  logger.error(error.text)
})

buildOutput.warnings.forEach(warning => {
  logger.warn(warning.text)
})

logger.info('Server build finished ✓')