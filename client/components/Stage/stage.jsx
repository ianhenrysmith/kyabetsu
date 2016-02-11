import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Badge from "material-ui/lib/badge";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Item from "../Item/item";

import { DropTarget } from 'react-dnd';

var stageTarget = {
  canDrop: function (props) {
    return true;
  },

  drop: function (props) {
    dispatcher.handleAction({
      actionType: constants.ITEM_DROPPED,
      data: {stageId: props.stage.shortname}
    });
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class StageComponent extends Component {
  renderOverlay() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: "yellow",
      }} />
    )
  }

  renderItems(stage, items) {
    return (
      <div className="itemsContainer itemsList" data-stage-id={stage.shortname} ref="items">
        {
          _.map(items, function(item) {
            return (
              <Item item={item} />
            )
          })
        }
      </div>
    )
  }

  renderEmpty(stage) {
    return (
      <div className="itemsContainer itemsList" data-stage-id={stage.shortname} ref="items">
        <p></p>
      </div>
    )
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;
    const connectDropTarget = this.props.connectDropTarget;
    const isOver = this.props.isOver;
    const canDrop = this.props.canDrop;

    return connectDropTarget(
      <div className="stageContainer">
        <Badge badgeContent={_.size(items)} primary={true} className="contentCount" />
        <Card className="stageCard">
          <CardHeader title={stage.name} subtitle={stage.description} />
          
          { (_.size(items) > 0) ? this.renderItems(stage, items) : this.renderEmpty(stage) }
        </Card>
      </div>
    );
  }
}

export default DropTarget("item", stageTarget, collect)(StageComponent);