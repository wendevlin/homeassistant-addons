import { build } from "bun"
import { buildCss } from "./tailwind"

// build css with tailwind and daisyui
await buildCss()

console.log('CSS build finished ✓')

// build the server
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/server.js',
  target: 'bun',
})

console.log('Server build finished ✓')