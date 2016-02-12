var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");

var _stages = [
  {name: "💡 Idea", description: "Just wondering...", shortname: "idea", tasks: [{description: "See if this idea is worth pursuing"}]},
  {name: "📐 Design", description: "I'm trying I'm trying", shortname: "design", tasks: [{description: "Make some wireframes"}]},
  {name: "🚜 Production", description: "Make it happen, people", shortname: "in_progress", tasks: [{description: "Get this thing implemented"}]},
  {name: "🔬 Acceptance", description: "Validate my existence", shortname: "acceptance", tasks: [{description: "Try to get this thing past legal"}]},
  {name: "🍻 Deployed", description: "That thing's operational", shortname: "deployed", tasks: []},
];

var addTask = function(data) {
  var stage = stagesStore.getStage(data.stageId);

  var task = { description: data.description };

  stage.tasks.push(task);
}

var stagesStore = _.extend({}, baseStore, {
  getStages: function() {
    return _.cloneDeep(_stages);
  },
  getStage: function(id) {
    return _.find(_stages, { shortname: id });
  }
});

dispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case constants.TASK_CREATED:
      addTask(action.data);
      stagesStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = stagesStore;