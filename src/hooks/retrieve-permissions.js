module.exports = function(options = {}) {
  return async (context) => {
    const {data} = context;

    // here we need to discover if a user have permission for CUD
    // if (user.permissions !== 'admin') {
    //   throw new Error('Only admin can create and update users');
    // }

    return context;
  };
};
