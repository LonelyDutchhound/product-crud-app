/* eslint-disable no-console */
const cluster = require('cluster');
const logger = require('./logger');
const app = require('./app');
const messageTypes = require('../src/helpers/message-types');
const processMessageCreator = require('../src/helpers/process-message-creator');

if (cluster.isMaster) {
  const userWorkerMap = {};

  const handleWorkerMessages = (worker, msg) => {
    const {user, type, payload} = msg;

    switch (type) {
      case messageTypes.addToUserWorkerMap:
        userWorkerMap[user] = worker;
        break;
      case messageTypes.removeFromUserWorkerMap:
        delete userWorkerMap[user];
        break;
      case messageTypes.handleMessage:
        if (userWorkerMap[user]) {
          userWorkerMap[user].send({user, payload});
        }
        break;
    }
  };

  cluster.on('message', handleWorkerMessages);

  const cpuQuantity = require('os').cpus().length;

  for (let i = 0; i <= cpuQuantity; i++) {
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork();
  }

  cluster.on('listening', (worker) => {
    logger.info(
        `Worker #${worker.id} is now connected`);
  });

  cluster.on('disconnect', (worker) => {
    logger.info(`Worker #${worker.id} has disconnected`);
  });

  cluster.on('exit', (worker) => {
    logger.info(`Worker #${worker.id} is dead`);
    cluster.fork();
  });
} else {
  const port = app.get('port');
  const hostname = app.get('host');
  const sendToMaster = (msg) => process.send(msg);
  const appProductService = app.service('products');

  app
      .listen(port)
      .on('listening', () =>
        logger.info(`Feathers server listening on ${hostname}:${port}`),
      );

  appProductService.on('created', (data) => {
    const processMessage = processMessageCreator(
        data.author,
        'product created',
        data.name);
    sendToMaster(processMessage);
  });
  appProductService.on('updated', (data) => {
    const processMessage = processMessageCreator(
        data.author,
        'product updated',
        data.name);
    sendToMaster(processMessage);
  });
  appProductService.on('removed', (data) => {
    const processMessage = processMessageCreator(
        data.author,
        'product deleted',
        data.name);
    sendToMaster(processMessage);
  });

  process.on('uncaughtException', (err) => {
    logger.error(`${(new Date).toUTCString()} uncaught exception: ${err.message}`);
    logger.error(err.stack);
    process.exit(1);
  });
}

