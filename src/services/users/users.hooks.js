const {authenticate} = require('@feathersjs/authentication').hooks;
const retrievePermissions = require('../../hooks/retrieve-permissions');
const {
  hashPassword, protect,
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), retrievePermissions()],
    update: [hashPassword('password'), authenticate('jwt'), retrievePermissions()],
    patch: [hashPassword('password'), authenticate('jwt'), retrievePermissions()],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
