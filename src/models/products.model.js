module.exports = function(app) {
  const modelName = 'products';
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const schema = new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: false},
  }, {
    timestamps: true,
  });

  return mongooseClient.model(modelName, schema);
};
