// Initializes the `products` service on path `/products`
const {Products} = require('./products.class');
const createModel = require('../../models/products.model');
const hooks = require('./products.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  app.use('/products', new Products(options, app));

  const service = app.service('products');
  service.hooks(hooks);
};
