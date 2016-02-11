import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

import { DragSource } from 'react-dnd';

var itemSource = {
  beginDrag: function (props) {
    dispatcher.handleAction({
      actionType: constants.ITEM_DRAG_STARTED,
      data: {itemId: props.item.id}
    });

    return { itemId: props.item.id }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

DragSource("item", itemSource, collect)

class ItemComponent extends Component {
  render() {
    var item = this.props.item;
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging;

    return connectDragSource(
      <div>
        <Card className="itemCard gu-draggable" data-item-id={item.id}>
          <CardHeader title={item.name} subtitle={item.description}></CardHeader>
        </Card>
      </div>
    );
  }
}

export default DragSource("item", itemSource, collect)(ItemComponent);