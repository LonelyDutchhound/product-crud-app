const {createLogger, format, transports} = require('winston');

const path = module.filename.split('/').slice(-2).join('/');

// Configure the Winston logger.
// For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
      format.splat(),
      format.simple(),
  ),
  transports: [
    new transports.Console({
      colorize: true,
      level: 'debug',
    }),
    new transports.File({
      filename: 'node.log',
      label: path,
    }),
  ],
});

module.exports = logger;
