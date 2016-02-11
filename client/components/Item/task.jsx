import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Checkbox from "material-ui/lib/checkbox";
// import TextField from "material-ui/lib/text-field";
import ListItem from "material-ui/lib/lists/list-item";

class ItemFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.task.description,
      done: props.task.done
    };

    this.setState = this.setState.bind(this);
    // this.nameChanged = this.nameChanged.bind(this);
  }

  // nameChanged(event) {
  //   this.setState({name: event.target.value});
  // }

  // descriptionChanged(event) {
  //   this.setState({description: event.target.value});
  // }

  render() {
    var done = this.state.done;
    var description = this.state.description;

    return (
      <div>
        <ListItem primaryText={description} leftCheckbox={<Checkbox checked={done} />} />
      </div>
    );
  }
}

export default ItemFormComponent;