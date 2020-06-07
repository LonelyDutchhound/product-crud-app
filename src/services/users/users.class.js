const {Service} = require('feathers-mongoose');

exports.Users = class Users extends Service {
  async find(params) {
    return super.find(params);
  }

  async create(data, params) {
    const {name, email, password} = data;
    const userData = {
      name,
      email,
      password,
    };

    return super.create(userData, params);
  }
};


