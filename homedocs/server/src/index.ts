import { buildCss } from '../scripts/tailwind'
import { Elysia } from 'elysia'
import { splitPaths } from "./utils/pathResolver";
import { file } from "bun";
import jsxContent from './templates/content'
import { webserver } from './webserver';
import { buildDocs } from './htmlBuilder';
import { startWatcher } from './fileWatcher';

// 2 parts
// 1. markdown to html watcher
// 2. webserver

// 1. markdown files werden in html umgewandelt mit markdown-it oder remark
// 1. dann wird html in vue file integriert und gebaut
// 1. alles muss relative parts haben, css gibt es nur im root und wirkt korrekt relativ aufgelöst
// 1. bilder werden dazu kopiert und relativ verlinkt

// if dev mode only rebuild css
if (process.env.NODE_ENV !== 'production') {
  console.log(`Homedocs is running in development mode`)
  await buildCss()
  console.log(`Css built`)
}

startWatcher()
// await buildDocs()
// console.log('Initial docs built')

webserver
  .listen(3000)


console.log(
  `🦊 Elysia is running at ${webserver.server?.url}`
);
