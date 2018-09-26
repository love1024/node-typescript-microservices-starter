import * as winston from 'winston';

export const logger = winston.createLogger();

const env = 'development';

if (env == 'development') { 
  logger.add(new winston.transports.Console({
    level: 'verbose',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.simple()
    )
  }))
}

process.on('uncaughtException', (err) => {
  logger.warn('system level exceptions at, Possibly Unhandled Rejection:  ', err);
})