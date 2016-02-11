import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import itemsStore from "../../stores/itemsStore";
import stagesStore from "../../stores/stagesStore";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import AppBar from "material-ui/lib/app-bar";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import RaisedButton from "material-ui/lib/raised-button";
import Popover from "material-ui/lib/popover/popover";
import Card from "material-ui/lib/card/card";
import TextField from "material-ui/lib/text-field";

import Stage from "../Stage/stage";

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: itemsStore.getItems(), open: false};

    this.updateItems = this.updateItems.bind(this);
    this.setState = this.setState.bind(this);
    this.handleNewContent = this.handleNewContent.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.createContent = this.createContent.bind(this);

    itemsStore.addChangeListener(this.updateItems);
  }

  componentDidMount() {
    itemsStore.addChangeListener(this.updateItems);
  }

  componentWillUnmount() {
    itemsStore.removeChangeListener(this.updateItems);
  }

  updateItems() {
    this.setState({items: itemsStore.getItems()});
  }

  handleNewContent(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  createContent() {
    dispatcher.handleAction({
      actionType: constants.CONTENT_CREATED,
      data: {
        description: this.refs.newContentDescription._getInputNode().value,
        name: this.refs.newContentName._getInputNode().value
      }
    });

    this.setState({
      open: false
    });
  }

  renderStages() {
    var allItems = this.state.items;

    return (
      <div className="stages">
        {
          _.map(stagesStore.getStages(), function(stage) {
            var stageItems = _.filter(allItems, function(item) {
              return item.stage == stage.shortname;
            });

            return (
              <Stage ref={`stage_${stage.shortname}`} stage={stage} items={stageItems} />
            )
          })
        }
      </div>
    )
  }

  renderCreate() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <RaisedButton label="Create Content" primary={true} onClick={this.handleNewContent} />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Card style={{padding: "20px"}}>
              <TextField hintText="Title" floatingLabelText="Title" ref="newContentName" /><br/>
              <TextField hintText="Body" floatingLabelText="Body" ref="newContentDescription" /><br/>
              <RaisedButton primary={true} label="Create" onClick={this.createContent} />
            </Card>
          </Popover>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    return (
      <section id="stagesContainer">
        <AppBar title="Kanban" iconClassNameRight="muidocs-icon-navigation-expand-more" id="appBar" />

        {this.renderCreate()}

        {this.renderStages()}
      </section>
    );
  }
};

export default DragDropContext(HTML5Backend)(IndexComponent);
