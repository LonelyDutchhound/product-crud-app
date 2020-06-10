const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const socketIO = require('@feathersjs/socketio');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');
const mongoose = require('./mongoose');
const messageTypes = require('../src/helpers/message-types');

const app = express(feathers());

app.configure(configuration());

app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// this middleware was left here for testing purposes: connection from the browser
app.use('/', express.static(app.get('public')));

app.configure(express.rest());
app.configure(mongoose);

app.configure(authentication);
app.configure(services);

const socketConfig = (io) => {
  const usersConnectionsMap = {};
  process.on('message', ({user, payload}) => {
    if (!usersConnectionsMap[user]) {
      return;
    }
    const publishHandler = require('../src/helpers/publish-handler');
    usersConnectionsMap[user].socket.emit('publish', publishHandler(payload));
  });
  io.on('connection', (socket) => {
    socket.on('auth', async (token) => {
      const {sub: userID} = await app.service('authentication')
          .verifyAccessToken(token);
      const user = await app.service('users').get(userID);
      usersConnectionsMap[user.name] = {user, socket};
      process.send({
        type: messageTypes.addToUserWorkerMap,
        user: user.name,
      });
      socket.once('disconnect', () => {
        delete usersConnectionsMap[user.name];
        process.send({
          type: messageTypes.removeFromUserWorkerMap,
          user: user.name,
        });
      });
    });
  });
};
app.configure(socketIO(socketConfig));

app.use(express.notFound());
app.use(express.errorHandler({logger}));

app.configure(channels);
app.hooks(appHooks);

module.exports = app;
