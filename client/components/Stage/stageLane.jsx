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
              <Item key={"item_" + item.id + stage.shortname} item={item} stage={stage} />
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

  renderCount(stage, count, limit) {
    var isPrimary = stage.shortname != "deployed" && stage.shortname != "idea" && count > limit;
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
        <CardHeader title={stage.name} subtitle={stage.description} className="stageHeader" />
      )
    }
  }

  renderLane(stage, lane) {
    if (stage.shortname == "idea") {
      return <div className="laneNumber">{lane}</div>
    }
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;
    var size = _.size(items);
    var lane = this.props.lane;
    var limit = this.props.limit;
    var containerClasses = (lane > 0) ? `stageContainer notTop stage_${stage.shortname}` : `stageContainer top stage_${stage.shortname}`;
    var stageClasses = "stageCard";

    if (lane == 1) {
      stageClasses = "stageCard middle"
    }

    if (lane == 2) {
      stageClasses = "stageCard bottom"
    }

    const connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className={containerClasses}>
        { this.renderCount(stage, size, limit) }
        <Card className={stageClasses}>
          { this.renderHeader(stage, lane) }
          { (size > 0) ? this.renderItems(stage, items) : this.renderEmpty(stage) }
          { this.renderLane(stage, lane) }
        </Card>
      </div>
    );
  }
}

export default DropTarget("item", stageTarget, collect)(StageLaneComponent);