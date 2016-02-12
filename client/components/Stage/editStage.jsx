import React, { Component } from "react";
import _ from "lodash";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import TextField from "material-ui/lib/text-field";
import List from "material-ui/lib/lists/list";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Checkbox from "material-ui/lib/checkbox";
import ListItem from "material-ui/lib/lists/list-item";

class EditStageComponent extends Component {
  renderTasks(stage) {
    var tasks = stage.tasks;

    return (
      <List subheader="Workflow" className="itemTasksContainer tasksList" data-item-id={stage.shortname} ref="tasks">
        {
          _.map(tasks, function(task) {
            return (
              <ListItem key={"stage_task" + stage.shortname + _.random(0, 9999)} primaryText={task.description} leftCheckbox={<Checkbox checked={false} />} />
            )
          })
        }
      </List>
    )
  }

  renderNoTasks() {
    return (
      <div>
        <p>Workflow</p><br/>
        <p>This stage has no tasks.</p>
      </div>
    )
  }

  render() {
    var stage = this.props.stage;

    return (
      <div>
        <CardHeader title={stage.name} subtitle={stage.description} className="stageHeader" />
        {stage.tasks.length > 0 ? this.renderTasks(stage) : this.renderNoTasks()}
      </div>
    )
  }
}

export default EditStageComponent;