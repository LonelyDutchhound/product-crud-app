const users = require('./users/users.service.js');
const products = require('./products/products.service.js');

module.exports = function(app) {
  app.configure(users);
  app.configure(products);
};
