module.exports = function(app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    name: {type: String, unique: true},
    email: {type: String, unique: true, lowercase: true},
    password: {type: String},
    permissions: {type: String},
  }, {
    timestamps: true,
  });

  return mongooseClient.model(modelName, schema);
};
