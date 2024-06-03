// import { build } from "bun"
import logger from "../src/utils/logger"
import { buildCss } from "./tailwind"

// build css with tailwind and daisyui
await buildCss()

logger.info('CSS build finished ✓')

// build the server
// TODO use optimized bun build
// await Bun.build({
//   entrypoints: ['./src/index.ts'],
//   outdir: './dist',
//   target: 'bun',
// })

logger.info('Server build finished ✓')