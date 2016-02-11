var _ = require("lodash");

var dispatcher = require("../flux/dispatcher");
var constants = require("../flux/constants");

var baseStore = require("./baseStore");

var _stages = [
  {name: "Idea", description: "Just wondering...", shortname: "idea", tasks: [{description: "See if this idea is worth pursuing."}]},
  {name: "Design", description: "I'm trying I'm trying", shortname: "design", tasks: [{description: "Make some wireframes."}]},
  {name: "In Progress", description: "Make it happen, people", shortname: "in_progress", tasks: [{description: "Get this thing implemented."}]},
  {name: "Acceptance", description: "Validate my existence", shortname: "acceptance", tasks: [{description: "Try to get this thing pase legal."}]},
  {name: "Deployed", description: "That thing's operational", shortname: "deployed", tasks: []},
];

var stagesStore = _.extend({}, baseStore, {
  getStages: function() {
    return _.cloneDeep(_stages);
  }
});

// dispatcher.register(function(payload) {
//   var action = payload.action;

//   switch (action.actionType) {
//     case constants.ALL_BUYING_STAGES_DATA_RECEIVED:
//       setBuyingStages(action.data);
//       stagesStore.emitChange();
//       break;

//     default:
//       return true;
//   }
// });

module.exports = stagesStore;