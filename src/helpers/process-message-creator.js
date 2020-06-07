const messageTypes = require('../helpers/message-types');

module.exports = (user, serviceEvent, payloadValue) => ({
  type: messageTypes.handleMessage,
  user,
  payload: {
    event: serviceEvent,
    value: payloadValue,
  },
});
