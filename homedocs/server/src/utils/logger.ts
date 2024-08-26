import pino from 'pino'
import pinoPretty from 'pino-pretty'

const logger = pino(
	pinoPretty({
		translateTime: 'yyyy-mm-dd HH:MM:ss.l',
		ignore: 'pid,level,hostname',
	}),
)

export default logger
