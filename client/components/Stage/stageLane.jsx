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
    var data = {
      stageId: props.stage.shortname,
      lane: props.lane
    };
    dispatcher.handleAction({
      actionType: constants.ITEM_DROPPED,
      data: data
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

class StageLaneComponent extends Component {
  renderItems(stage, items) {
    return (
      <div className="itemsContainer itemsList" data-stage-id={stage.shortname} ref="items">
        {
          _.map(items, function(item) {
            return (
              <Item item={item} stage={stage} />
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

  renderCount(count, limit) {
    var isPrimary = count > limit;
    var isSecondary = count > 0;

    if (count) {
      return (
        <Badge badgeContent={count} primary={isPrimary} secondary={isSecondary} className="contentCount" />
      );
    }
  }

  renderHeader(stage, lane) {
    if (lane == 0) {
      return (
        <CardHeader title={stage.name} subtitle={stage.description} />
      )
    }
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;
    var size = _.size(items);
    var lane = this.props.lane;
    var limit = this.props.limit;
    var containerClasses = (lane > 0) ? "stageContainer notTop" : "stageContainer"
    const connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className={containerClasses}>
        { this.renderCount(size, limit) }
        <Card className="stageCard">
          { this.renderHeader(stage, lane) }
          { (size > 0) ? this.renderItems(stage, items) : this.renderEmpty(stage) }
        </Card>
      </div>
    );
  }
}

export default DropTarget("item", stageTarget, collect)(StageLaneComponent);