import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import itemsStore from "../../stores/itemsStore";
import stagesStore from "../../stores/stagesStore";
import messagesStore from "../../stores/messagesStore";

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import AppBar from "material-ui/lib/app-bar";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import RaisedButton from "material-ui/lib/raised-button";
import Popover from "material-ui/lib/popover/popover";
import Card from "material-ui/lib/card/card";
import TextField from "material-ui/lib/text-field";
import Snackbar from "material-ui/lib/snackbar";

import Stage from "../Stage/stage";

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: itemsStore.getItems(),
      stages: stagesStore.getStages(),
      open: false,
      messageOpen: false,
      message: "Something happened"
    };

    this.updateItems = this.updateItems.bind(this);
    this.updateStages = this.updateStages.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.setState = this.setState.bind(this);
    this.handleNewContent = this.handleNewContent.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
    this.createContent = this.createContent.bind(this);

    itemsStore.addChangeListener(this.updateItems);
    stagesStore.addChangeListener(this.updateStages);
    messagesStore.addChangeListener(this.updateMessage);
  }

  componentDidMount() {
    itemsStore.addChangeListener(this.updateItems);
    stagesStore.addChangeListener(this.updateStages);
    messagesStore.addChangeListener(this.updateMessage);
  }

  componentWillUnmount() {
    itemsStore.removeChangeListener(this.updateItems);
    stagesStore.removeChangeListener(this.updateStages);
    messagesStore.removeChangeListener(this.updateMessage);
  }

  updateItems() {
    this.setState({items: itemsStore.getItems()});
  }

  updateStages() {
    this.setState({stages: stagesStore.getStages()}); 
  }

  updateMessage() {
    var message = messagesStore.getMessage();
    this.setState({messageOpen: true, message: message}); 
  }

  handleNewContent(event) {
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleMessageClose() {
    this.setState({ messageOpen: false });
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
    var stages = this.state.stages;
    var allItems = this.state.items;

    return (
      <div className="stages">
        {
          _.map(stages, function(stage) {
            var stageItems = _.filter(allItems, function(item) {
              return item.stage == stage.shortname;
            });

            return (
              <Stage key={"stage_" + stage.shortname} ref={`stage_${stage.shortname}`} stage={stage} items={stageItems} />
            )
          })
        }
      </div>
    )
  }

  renderCreate() {
    return (
      <div>
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
      </div>
    );
  }

  renderNotifications() {
    return (
      <Snackbar
        open={this.state.messageOpen}
        message={this.state.message}
        autoHideDuration={4000}
        onRequestClose={this.handleMessageClose}
        style={{textAlign: "center", opacity: 0.7}} />
    )
  }

  render() {
    return (
      // キャベツ
      <section id="stagesContainer">
        <AppBar title="🍏 Kanban" iconClassNameRight="muidocs-icon-navigation-expand-more" id="appBar">
          <div className="createContentButton">
            <RaisedButton label="✨ Create Content" primary={true} onClick={this.handleNewContent} />
          </div>
        </AppBar>

        {this.renderCreate()}

        {this.renderStages()}
        {this.renderNotifications()}
      </section>
    );
  }
};

export default DragDropContext(HTML5Backend)(IndexComponent);
