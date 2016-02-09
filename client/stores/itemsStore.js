var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");

var _items = [
  {id: "1", name: "Smoothies", description: "Life is a grind", stage: "idea" },
  {id: "2", name: "Defenestrate the Paupers", description: "Involves some heavy lifting", stage: "design" },
  {id: "3", name: "Caribou", description: "Take a left at Manitoba", stage: "in_progress" },
  {id: "4", name: "Fish Mongering", description: "You dare insult the son of a shepherd", stage: "acceptance" },
  {id: "5", name: "Safety Dance", description: "You got Von Miller'd", stage: "deployed" }
];

var getItemById = function(id) {
  return _.find(_items, { id: id });
};

var moveItem = function(data) {
  var item = getItemById(data.itemId);

  if (item) {
    item.stage = data.stageId;
  }
};

var itemsStore = _.extend({}, baseStore, {
  getItems: function() {
    return _.cloneDeep(_items);
  },

  getItemsForStageId: function(stageId) {
    var items = itemsStore.getItems();

    return _.filter(items, function(item) {
      return item.stage == stageId;
    });
  }
});

dispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case constants.ITEM_DROPPED:
      moveItem(action.data);
      itemsStore.emitChange();
      break;

    default:
      return true;
  }
});

module.exports = itemsStore;