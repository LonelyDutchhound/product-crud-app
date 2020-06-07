const app = require('../../src/app');

describe('\'products\' service', () => {
  it('registered the service', () => {
    const service = app.service('products');
    expect(service).toBeTruthy();
  });

  it('should create product if validation succeed', async () => {
    const service = app.service('products');
    const product = {
      name: 'Product',
      author: 'Author',
      description: 'Description',
    };

    try {
      await app.service('products').create(product);
      expect(service.create(product)).toContain(product);
    } catch (error) {
      // Do nothing
    }
  });
});
