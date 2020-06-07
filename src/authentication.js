const {AuthenticationService} = require('@feathersjs/authentication');
const {LocalStrategy} = require('@feathersjs/authentication-local');

class MyAuthService extends AuthenticationService {
  async getPayload(authResult, params) {
    const payload = await super.getPayload(authResult, params);
    const {user} = authResult;

    if (user && user.permissions) {
      payload.name = user.name;
      payload.permissions = user.permissions;
    }

    return payload;
  }
}

module.exports = (app) => {
  const authentication = new MyAuthService(app);

  authentication.register('local', new LocalStrategy());
  app.use('/authentication', authentication);
};
