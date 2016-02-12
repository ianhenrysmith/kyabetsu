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

class StageLaneBottomComponent extends Component {
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

  renderCount(count) {
    var isPrimary = count > 2;
    var isSecondary = count > 0;

    if (count) {
      return (
        <Badge badgeContent={count} primary={isPrimary} secondary={isSecondary} className="contentCount" />
      );
    }
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;
    var size = _.size(items);
    const connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className="stageContainer notTop">
        { this.renderCount(size) }
        <Card className="stageCard">            
          { (size > 0) ? this.renderItems(stage, items) : this.renderEmpty(stage) }
        </Card>
      </div>
    );
  }
}

export default DropTarget("item", stageTarget, collect)(StageLaneBottomComponent);