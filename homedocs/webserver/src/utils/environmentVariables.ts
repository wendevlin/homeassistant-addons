import { z } from 'zod'

export const environmentVariablesSchema = z.object({
  BUILD_PATH: z.string().default('../starlight/dist'),
  DOCS_PATH: z.string().default('../starlight/src'),
  FILES_PATH: z.string().default('../starlight/public/files'),
  BUILD_TIMEOUT_IN_SECONDS: z.coerce.number().min(10).default(60),
  INGRESS_ENTRY: z.coerce.string().min(1).default('/'),
})

type EnvironmentVariables = {
  buildPath: string
  docsPath: string
  filesPath: string
  buildTimeoutInSeconds: number
  ingressEntry: string
}

const parsedEnvironmentVariables = environmentVariablesSchema.parse(process.env)

const environmentVariables: EnvironmentVariables = {
  buildPath: parsedEnvironmentVariables.BUILD_PATH,
  docsPath: parsedEnvironmentVariables.DOCS_PATH,
  filesPath: parsedEnvironmentVariables.FILES_PATH,
  buildTimeoutInSeconds: parsedEnvironmentVariables.BUILD_TIMEOUT_IN_SECONDS,
  ingressEntry: parsedEnvironmentVariables.INGRESS_ENTRY,
}

export default environmentVariables
