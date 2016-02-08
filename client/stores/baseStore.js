var _ = require("lodash");
var EventEmitter = require("events").EventEmitter;

var baseStore = _.extend({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit("change");
  },

  addChangeListener: function(callback) {
    this.setMaxListeners(0);
    this.addListener("change", callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener("change", callback);
  }
});

module.exports = baseStore;