const {Service} = require('feathers-mongoose');
const processMessageCreator = require('../../helpers/process-message-creator');

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
    const createdProduct = await super.create(productData);

    const processMessage = processMessageCreator(
        author,
        'product created',
        createdProduct.name);
    process.send(processMessage);

    return createdProduct;
  }

  async update(id, data, params) {
    const {name, author, description} = data;
    const newProductData = {
      name,
      author,
      description,
    };
    const updatedProduct = await super.update(id, newProductData);

    const processMessage = processMessageCreator(
        author,
        'product updated',
        updatedProduct.name);
    process.send(processMessage);

    return updatedProduct;
  };

  async remove(id, params) {
    const deletedProduct = await super.remove(id, params);

    const processMessage = processMessageCreator(
        deletedProduct.author,
        'product deleted',
        deletedProduct.name);
    process.send(processMessage);

    return deletedProduct;
  }
};


