import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Checkbox from "material-ui/lib/checkbox";
import ListItem from "material-ui/lib/lists/list-item";

class ItemFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.task.description,
      done: props.task.done
    };

    this.setState = this.setState.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick() {
    var done = !this.state.done
    this.setState({done: done});

    dispatcher.handleAction({
      actionType: constants.TASK_COMPLETION_CHANGED,
      data: {itemId: this.props.itemId, taskId: this.props.task.id, done: done}
    });
  }

  render() {
    var done = this.state.done;
    var description = this.state.description;
    var handler = this.handleCheckboxClick;

    return (
      <div>
        <ListItem primaryText={description} leftCheckbox={<Checkbox checked={done} onCheck={handler} />} />
      </div>
    );
  }
}

export default ItemFormComponent;