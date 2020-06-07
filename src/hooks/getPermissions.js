module.exports = (options = {}) => {
  return async (context) => {
    const {app, params} = context;
    const accessToken = params.headers['authorization'];
    const {sub: userID} = await app.service('authentication')
        .verifyAccessToken(accessToken);
    const user = await app.service('users').get(userID);
    if (user && user.permissions === 'admin') {
      return context;
    }
    throw new Error('You need admin rights to modify or delete the product');
  };
};
