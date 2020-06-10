const assert = require('assert');
const app = require('../../src/app');


describe('\'products\' service', () => {
  it('registered the service', () => {
    const service = app.service('products');

    assert.ok(service, 'Registered the service');
  });

  it('creates a product', async () => {
    const product = await app.service('products').create({
      name: 'product name',
      author: 'product author',
      description: 'product description',
    });

    assert.strictEqual(product.name, 'product name');
    assert.strictEqual(product.author, 'product author');
    assert.strictEqual(product.description, 'product description');
  });

  xit('does not create a product if required fields missing', async () => {
    const create = async () => await app.service('products').create({
      name: '',
      author: '',
      description: 'product description',
    });

    assert.throws(create, Error);
  });
});
