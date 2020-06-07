module.exports = (options = {}) => {
  return async (context) => {
    const {data} = context;
    if (!data.name || !data.author) {
      throw new Error('Name and author are required fields');
    }
    return context;
  };
};
