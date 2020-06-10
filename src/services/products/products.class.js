const {Service} = require('feathers-mongoose');

exports.Products = class Products extends Service {
  async find(params) {
    return await super.find(params);
  }

  async create(data, params) {
    const {name, author, description} = data;
    const productData = {
      name,
      author,
      description,
    };
    return await super.create(productData);
  }

  async update(id, data, params) {
    const {name, author, description} = data;
    const newProductData = {
      name,
      author,
      description,
    };
    return await super.update(id, newProductData);
  };

  async remove(id, params) {
    return await super.remove(id, params);
  }
};


