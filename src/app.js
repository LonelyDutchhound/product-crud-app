const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketIO = require('@feathersjs/socketio');

const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');
const mongoose = require('./mongoose');

const app = express(feathers());

app.configure(configuration());

app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.configure(express.rest());
app.configure(socketIO());

app.configure(mongoose);

app.configure(authentication);
app.configure(services);
app.configure(channels);

app.use(express.notFound());
app.use(express.errorHandler({logger}));

app.hooks(appHooks);

module.exports = app;
