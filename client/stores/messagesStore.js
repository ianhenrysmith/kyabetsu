var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");

var _message = [
];

var setMessage = function(message) {
  _message = message;
}

var messagesStore = _.extend({}, baseStore, {
  getMessage: function() {
    return _.cloneDeep(_message);
  }
});

dispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case constants.TASK_CREATED:
      setMessage("Task created 🤘");
      messagesStore.emitChange();
      break;
    case constants.CONTENT_CREATED:
      setMessage("Content created 😺");
      messagesStore.emitChange();
      break;
    case constants.TASK_COMPLETION_CHANGED:
      setMessage("Task updated 👻");
      messagesStore.emitChange();
      break;
    case constants.ITEM_DROPPED:
      setMessage("Content updated 🍤");
      messagesStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = messagesStore;