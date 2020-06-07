const {Service} = require('feathers-mongoose');

exports.Products = class Products extends Service {
  async find(params) {
    return super.find(params);
  }

  async create(data, params) {
    const {name, author, description} = data;
    const productData = {
      name,
      author,
      description,
    };

    return super.create(productData);
  }

  async update(id, data, params) {
    const {name, author, description} = data;
    const newProductData = {
      name,
      author,
      description,
    };

    return super.update(id, newProductData);
  };

  async remove(id, params) {
    return super.remove(id, params);
  }
};


