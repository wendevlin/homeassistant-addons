import { z } from 'zod'

export const environmentVariablesSchema = z.object({
	DOCS_BASE_PATH: z.string().default('docs'),
})

type EnvironmentVariables = {
	docsBasePath: string
}

const parsedEnvironmentVariables = environmentVariablesSchema.parse(process.env)

const environmentVariables: EnvironmentVariables = {
	docsBasePath: parsedEnvironmentVariables.DOCS_BASE_PATH,
}

export default environmentVariables
