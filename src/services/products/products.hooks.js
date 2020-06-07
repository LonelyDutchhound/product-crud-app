const validateProduct = require('../../hooks/validate-product');
const getPermissions = require('../../hooks/getPermissions');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateProduct()],
    update: [validateProduct(), getPermissions()],
    patch: [getPermissions()],
    remove: [getPermissions()],
  },

  after: {
    all: [],
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
