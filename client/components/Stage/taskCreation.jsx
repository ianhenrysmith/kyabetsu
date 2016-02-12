import React from "react";
import _ from "lodash";

import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import RaisedButton from "material-ui/lib/raised-button";
import Popover from "material-ui/lib/popover/popover";
import Card from "material-ui/lib/card/card";
import TextField from "material-ui/lib/text-field";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

class TaskCreationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.createTask = this.createTask.bind(this);
    this.setState = this.setState.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  handleNewTask(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  createTask() {
    dispatcher.handleAction({
      actionType: constants.TASK_CREATED,
      data: {
        description: this.refs.newTaskDescription._getInputNode().value,
        stageId: this.refs.creationContainer.getAttribute("data-stage-id")
      }
    });

    this.setState({
      open: false
    });
  }

  render() {
    var stage = this.props.stage;

    return (
      <div ref="creationContainer" data-stage-id={stage.shortname}>
        <RaisedButton label="✨ Create Task" primary={true} onClick={this.handleNewTask} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Card style={{padding: "20px"}}>
            <TextField hintText="Description" floatingLabelText="Description" ref="newTaskDescription" /><br/>
            <RaisedButton primary={true} label="Create" onClick={this.createTask} />
          </Card>
        </Popover>
      </div>
    )
  }
}

export default TaskCreationComponent;