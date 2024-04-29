import { staticPlugin } from '@elysiajs/static'
import { Elysia } from 'elysia'
import environmentVariables from './utils/environmentVariables'

export const startServer = async (port: number) => {
  const webserver = new Elysia()
    .use(
      staticPlugin({
        prefix: '/',
      }),
    )
    .use(
      staticPlugin({
        // neccessary to use search in ingress
        prefix: environmentVariables.ingressEntry,
      }),
    )
    .onRequest(({ set }) => {
      // no cache
      set.headers['Surrogate-Control'] = 'no-store'
      set.headers['Cache-Control'] =
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      // Deprecated though https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
      set.headers.Pragma = 'no-cache'
      set.headers.Expires = '0'
    })
    .onError(async ({ code }) => {
      if (code === 'NOT_FOUND') {
        const file = Bun.file(`${environmentVariables.buildPath}/404.html`)
        if (await file.exists()) {
          return file
        }
        return Bun.file('./templates/404.html')
      }
    })
    .listen(4321)

  return webserver
}
