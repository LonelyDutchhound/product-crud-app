const validateProduct = require('../../hooks/validate-product');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateProduct()],
    update: [validateProduct()],
    patch: [],
    remove: [],
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
