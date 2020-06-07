/* eslint-disable no-console */
const cluster = require('cluster');
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const hostname = app.get('host');

if (cluster.isMaster) {
  const cpuQuantity = require('os').cpus().length;

  for (let i = 0; i <= cpuQuantity; i++) {
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork();
  }

  cluster.on('listening', (worker, address) => {
    logger.info(
        `Worker #${worker.id} is now connected to ${JSON.stringify(address)}`);
  });

  cluster.on('disconnect', (worker) => {
    logger.info(`Worker #${worker.id} has disconnected`);
  });

  cluster.on('exit', (worker) => {
    logger.info(`Worker #${worker.id} is dead`);
    cluster.fork();
  });
} else {
  app
      .listen(port)
      .on('listening', () =>
        logger.info(`Feathers server listening on ${hostname}:${port}`),
      );

  process.on('uncaughtException', (err) => {
    logger.error(`${(new Date).toUTCString()} uncaught exception: ${err.message}`);
    logger.error(err.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason),
  );
}

