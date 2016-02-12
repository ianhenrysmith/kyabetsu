var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");
var stagesStore = require("./stagesStore");

var _items = [
  {
    id: "1",
    name: "Smoothies",
    daysInStage: 2,
    activity: ["Created by Ian for a hackathon."],
    description: "Life is a grind",
    stage: "idea",
    tasks: [{id: "1", done: true, description: "Finish This Task"}]
  },
  {
    id: "2",
    name: "Defenestrate the Paupers",
    daysInStage: 2,
    activity: ["Created by Ian for a hackathon."],
    description: "Involves some heavy lifting",
    stage: "design",
    tasks: [{id: "1", done: true, description: "Finish This Task"}]
  },
  {
    id: "3",
    name: "Caribou",
    daysInStage: 7,
    activity: ["Created by Ian for a hackathon."],
    description: "Take a left at Manitoba",
    stage: "in_progress",
    tasks: [{id: "1", done: true, description: "Finish This Task"}]
  },
  {
    id: "4",
    name: "Fish Mongering",
    daysInStage: 4,
    activity: ["Created by Ian for a hackathon."],
    description: "You dare insult the son of a shepherd",
    stage: "acceptance",
    tasks: [{id: "1", done: true, description: "Finish This Task"}]
  },
  {
    id: "5",
    name: "Safety Dance",
    daysInStage: 0,
    activity: ["Created by Ian for a hackathon."],
    description: "You got Von Miller'd",
    stage: "deployed",
    tasks: [{id: "1", done: true, description: "Finish This Task"}]
  }
];

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

  item.stage = stageId;
  item.daysInStage = 0;

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
    activity: ["Created by Ian on Feb 12"]
  }

  _items.push(item);

  setStage(item, "idea");
}

var moveItem = function(data) {
  var item = getItemById(_draggingItemId);

  if (item) {
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