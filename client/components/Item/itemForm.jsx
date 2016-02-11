import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import TextField from "material-ui/lib/text-field";
import List from "material-ui/lib/lists/list";

import Task from "./task";

class ItemFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.item.description,
      name: props.item.name,
      tasks: props.item.tasks
    };

    this.setState = this.setState.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(event) {
    this.setState({name: event.target.value});
  }

  descriptionChanged(event) {
    this.setState({description: event.target.value});
  }

  renderTasks(item, tasks) {
    return (
      <List subheader="Tasks" className="itemTasksContainer tasksList" data-item-id={item.id} ref="tasks">
        {
          _.map(tasks, function(task) {
            return (
              <Task task={task} itemId={item.id} />
            )
          })
        }
      </List>
    )
  }

  render() {
    var name = this.state.name;
    var description = this.state.description;
    var tasks = this.state.tasks || [];
    var item = this.props.item;

    return (
      <div>
        <TextField hintText="Content Title" floatingLabelText="Title" onChange={this.nameChanged} defaultValue={name} /><br/>
        <TextField hintText="Content Body" floatingLabelText="Body" onChange={this.descriptionChanged} defaultValue={description} />
        {this.renderTasks(item, tasks)}
      </div>
    );
  }
}

export default ItemFormComponent;