import { Elysia } from 'elysia'
import { splitPaths } from "./utils/pathResolver";
import { file } from "bun";
import environmentVariables from './utils/environmentVariables';

export const webserver = new Elysia()
  .get(
    '*',
    async ({ path, set }) => {
      let status = 200
      let responseData: any = `${path} not found` // TODO return styled 404 page

      const fileName = path.split('/').pop() ?? ''
      if (fileName === 'main.css') {
        set.headers["content-type"] = "text/css";
        return Bun.file('./dist/main.css')
      } else if (fileName.includes('.') && (fileName.split('.').pop()?.length ?? 0) > 1) {
        const file = Bun.file(`${environmentVariables.docsBasePath}/${path}`)
        if (!await file.exists()) {
          set.status = 404
        }
        responseData = file
      } else {
        let htmlFile = Bun.file(`./dist/docs/${path}.html`)
  
        if (!await htmlFile.exists()) {
          htmlFile = Bun.file(`./dist/docs/${path}/index.html`)
          if (!await htmlFile.exists()) {
            set.status = 404
          } else {
            responseData = htmlFile
          }
        } else {
          responseData = htmlFile
        }
      }

      set.status = status
      return responseData
    }
  )