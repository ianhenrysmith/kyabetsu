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
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  nameChanged(event) {
    var name = event.target.value;
    this.setState({name: event.target.value});

    this.updateContent({name: name});
  }

  descriptionChanged(event) {
    var description = event.target.value;
    this.setState({description: description});

    this.updateContent({description: description});
  }

  updateContent(data) {
    var defaultData = {
      id: this.props.item.id,
      description: this.state.description,
      name: this.state.name
    }

    var contentData = _.extend(defaultData, data)

    dispatcher.handleAction({
      actionType: constants.CONTENT_UPDATED,
      data: contentData
    });
  }

  renderTasks(item, tasks) {
    return (
      <List subheader="Tasks" className="itemTasksContainer tasksList" data-item-id={item.id} ref="tasks">
        {
          _.map(tasks, function(task) {
            return (
              <Task key={"task_" + task.id + item.id} task={task} itemId={item.id} />
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