var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");
var stagesStore = require("./stagesStore");
var defaultItems = require("../lib/defaultItems")

var _items = _.cloneDeep(defaultItems);
var _draggingItemId;

var getItemById = function(id) {
  return _.find(_items, { id: id });
};

var setDraggingItem = function(data) {
  _draggingItemId = data.itemId;
};

var setStage = function(item, stageId) {
  var newStage = stagesStore.getStage(stageId);

  if (item.stage) {
    var oldStage = stagesStore.getStage(item.stage);

    var activity = `Moved from ${oldStage.name} to ${newStage.name} after ${item.daysInStage} days.`

    item.activity.unshift(activity);
  }

  if (item.stage != stageId) {
    item.stage = stageId;
    item.daysInStage = 0;
  }

  _.each(newStage.tasks, function(task) {
    var newTask = {
      id: _.random(2, 9999999) + "",
      description: task.description,
      done: false
    }

    item.tasks.unshift(newTask);
  });
}

var newItem = function(data) {
  var item = {
    id: _.random(6, 9999999) + "",
    name: data.name,
    description: data.description,
    tasks: [],
    activity: ["Created by Ian on Feb 12"],
    lane: 0
  }

  _items.push(item);

  setStage(item, "idea");
}

var moveItem = function(data) {
  var item = getItemById(_draggingItemId);

  if (item) {
    item.lane = data.lane;
    setStage(item, data.stageId);
  }
};

var taskCompletionChanged = function(data) {
  var item = getItemById(data.itemId);

  var task = _.find(item.tasks, { id: data.taskId });

  var verb = data.done ? "completed" : "restarted";
  var activity = `${task.description} ${verb} by Ian on Feb 12.`
  item.activity.unshift(activity);

  task.done = data.done;
}

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

    case constants.CONTENT_CREATED:
      newItem(action.data);
      itemsStore.emitChange();
      break;

    case constants.TASK_COMPLETION_CHANGED:
      taskCompletionChanged(action.data);
      itemsStore.emitChange();
      break;

    default:
      return true;
  }
});

module.exports = itemsStore;