import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const safeWriteFileToPath = async (
	pathAndFileName: string,
	data: string,
) => {
	try {
		const passedPath = path.dirname(path.resolve(pathAndFileName))
		await mkdir(passedPath, { recursive: true })
		await writeFile(path.resolve(pathAndFileName), data)
	} catch (error) {
		console.error('Error writing safe file', error)
	}
}
