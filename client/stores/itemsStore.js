var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");
var stagesStore = require("./stagesStore");

var _items = [
  {id: "1", name: "Smoothies", description: "Life is a grind", stage: "idea", tasks: [{id: "1", done: true, description: "Finish This Task"}] },
  {id: "2", name: "Defenestrate the Paupers", description: "Involves some heavy lifting", stage: "design", tasks: [{id: "1", done: true, description: "Finish This Task"}] },
  {id: "3", name: "Caribou", description: "Take a left at Manitoba", stage: "in_progress", tasks: [{id: "1", done: true, description: "Finish This Task"}] },
  {id: "4", name: "Fish Mongering", description: "You dare insult the son of a shepherd", stage: "acceptance", tasks: [{id: "1", done: true, description: "Finish This Task"}] },
  {id: "5", name: "Safety Dance", description: "You got Von Miller'd", stage: "deployed", tasks: [{id: "1", done: true, description: "Finish This Task"}] }
];

var _draggingItemId;

var getItemById = function(id) {
  return _.find(_items, { id: id });
};

var setDraggingItem = function(data) {
  _draggingItemId = data.itemId;
};

var setStage = function(item, stageId) {
  var stage = stagesStore.getStage(stageId);

  item.stage = stageId;

  _.each(stage.tasks, function(task) {
    var newTask = {
      id: _.random(2, 9999999) + "",
      description: task.description,
      done: false
    }

    item.tasks.unshift(newTask);
  });
}

var moveItem = function(data) {
  var item = getItemById(_draggingItemId);

  if (item) {
    setStage(item, data.stageId);
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

    case constants.ITEM_DRAG_STARTED:
      setDraggingItem(action.data);
      break;

    default:
      return true;
  }
});

module.exports = itemsStore;