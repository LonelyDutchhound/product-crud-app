module.exports = function(app) {
  if (typeof app.channel !== 'function') {
    return;
  }


  app.on('connection', (connection) => app.channel(`anonymous`).join(connection));

  app.on('login', (authResult, {connection}) => {
    if (authResult.accessToken) {
      app.channel('anonymous').leave(connection);
      app.channel(`${connection.user.name}`).join(connection);
    }
  });

  app.service('products').publish((data) => {
    app.channel(`${data.name}`).publish(data);
  });
};
