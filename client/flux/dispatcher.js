import {Dispatcher} from "flux";
import _ from "lodash";

let dispatcher = new Dispatcher();

dispatcher.handleAction = function(action) {
  let dispatch;

  if (!action.actionType) {
    throw new Error("unimplemented action!");
  }

  dispatch = function() {
    dispatcher.dispatch({
      source: "SERVER_ACTION",
      action: action
    });
  };

  if (this.isDispatching()) {
    _.defer(dispatch);
  } else {
    dispatch();
  }
};

module.exports = dispatcher;