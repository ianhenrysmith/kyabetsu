import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Dialog from "material-ui/lib/dialog";
import RaisedButton from "material-ui/lib/raised-button";

import ItemForm from "./itemForm";

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

class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.setState = this.setState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    var item = this.props.item;
    // var closeCallback = this.handleClose;
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging;

    return connectDragSource(
      <div>
        <Card className="itemCard gu-draggable" data-item-id={item.id} onClick={this.handleOpen}>
          <CardHeader title={item.name} subtitle={item.description}></CardHeader>
        </Card>

        <Dialog
          title={item.name}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ItemForm item={item} />
        </Dialog>
      </div>
    );
  }
}

export default DragSource("item", itemSource, collect)(ItemComponent);