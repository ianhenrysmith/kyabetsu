import React, { Component } from "react";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Dialog from "material-ui/lib/dialog";
import RaisedButton from "material-ui/lib/raised-button";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";

import ItemForm from "./itemForm";
import ItemProduction from "./itemProduction";
import TaskTooltip from "./taskTooltip";

import { DragSource } from "react-dnd";

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
      open: false,
      value: "settings"
    };

    this.setState = this.setState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openProduction = this.openProduction.bind(this);
    this.openSettings = this.openSettings.bind(this);
  }

  handleOpen(event) {
    event.stopPropagation();
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  openSettings(value) {
    this.setState({
      value: "settings",
    });
  }

  openProduction(value) {
    this.setState({
      value: "production",
    });
  }

  renderTaskCompletion(doneCount, totalCount) {
    if (totalCount) {
      return <TaskTooltip doneCount={doneCount} totalCount={totalCount}/>
    }
  }

  renderHeader(item) {
    var lateClasses = "";
    var tasksCount = item.tasks.length;
    var completedTasksCount = _.size(_.filter(item.tasks, { done: true }))

    if (item.daysInStage > 2) {
      lateClasses = "kindaLate";

      if (item.daysInStage > 4) {
        lateClasses = "veryLate";
      }
    }

    return (
      <Card className={`itemCard gu-draggable ${lateClasses}`} data-item-id={item.id} onClick={this.handleOpen}>
        <CardHeader title={item.name} subtitle={item.description}></CardHeader>
        {this.renderTaskCompletion(completedTasksCount, tasksCount)}
      </Card>
    )
  }

  render() {
    var item = this.props.item;
    var openSettings = this.openSettings;
    var openProduction = this.openProduction;
    var tab = this.state.value;
    
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging;

    return connectDragSource(
      <div>
        {this.renderHeader(item)}

        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Tabs value={tab}>
            <Tab label="Settings" value="settings" onClick={openSettings} >
              <ItemForm item={item} />
            </Tab>

            <Tab label="Production" value="production" onClick={openProduction}>
              <ItemProduction item={item} stage={this.props.stage} />
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}

export default DragSource("item", itemSource, collect)(ItemComponent);