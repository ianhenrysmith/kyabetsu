import React, { Component } from "react";
import StageLane from "./stageLane";

class StageComponent extends Component {
  render() {
    var stage = this.props.stage;
    var items = this.props.items;

    var topItems = _.filter(items, {lane: 0});
    var bottomItems = _.filter(items, {lane: 1});
    const connectDropTarget = this.props.connectDropTarget;

    return (
      <div className="stagesContainer">
        <StageLane items={topItems} stage={stage} lane={0} limit={2}/>
        <StageLane items={bottomItems} stage={stage} lane={1} limit={4}/>
      </div>
    );
  }
}

export default StageComponent;