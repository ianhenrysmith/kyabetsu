import React, { Component } from "react";
import StageLane from "./stageLane";
import EditStage from "./editStage";

import Dialog from "material-ui/lib/dialog";

class StageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.setState = this.setState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);;
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;

    var topItems = _.filter(items, {lane: 0});
    var middleItems = _.filter(items, {lane: 1});
    var bottomItems = _.filter(items, {lane: 2});
    const connectDropTarget = this.props.connectDropTarget;

    return (
      <div className="stagesContainer" onClick={this.handleOpen}>
        <StageLane items={topItems} stage={stage} lane={0} limit={2}/>
        <StageLane items={middleItems} stage={stage} lane={1} limit={3}/>
        <StageLane items={bottomItems} stage={stage} lane={2} limit={4}/>

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <EditStage stage={stage} />
        </Dialog>
      </div>
    );
  }
}

export default StageComponent;