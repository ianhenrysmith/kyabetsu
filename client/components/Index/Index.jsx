import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
// import dragula from "react-dragula";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import dispatcher from "../../flux/dispatcher";
import constants from "../../flux/constants";

import itemsStore from "../../stores/itemsStore";
import stagesStore from "../../stores/stagesStore";

import AppBar from "material-ui/lib/app-bar";
import Stage from "../Stage/stage";

injectTapEventPlugin();

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: itemsStore.getItems()};

    this.updateItems = this.updateItems.bind(this);
    this.setState = this.setState.bind(this);

    itemsStore.addChangeListener(this.updateItems);
  }

  componentDidMount() {
    this.setupDragging();
  }

  componentWillUnmount() {
    itemsStore.removeChangeListener(this.updateItems);
  }

  updateItems() {
    this.setState({items: itemsStore.getItems()});
  }

  setupDragging() {
    // var items = []

    // var stageNames = [
    //   "stage_idea",
    //   "stage_design",
    //   "stage_in_progress",
    //   "stage_acceptance",
    //   "stage_deployed"
    // ]

    // var index = this;

    // _.each(stageNames, function(stageName) {
    //   var stage = index.refs[stageName];

    //   items.push(ReactDOM.findDOMNode(stage.refs.items));
    // });

    // dragula(items)
    //   .on('drop', function (itemElement, targetContainer, sourceContainer) {
    //     var itemId = itemElement.getAttribute("data-item-id");
    //     var stageId = targetContainer.getAttribute("data-stage-id");

    //     _.defer(function() {
    //       dispatcher.handleAction({
    //         actionType: constants.ITEM_DROPPED,
    //         data: {itemId: itemId, stageId: stageId}
    //       });
    //     })
    //   });
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

  render() {
    return (
      <section id="stagesContainer">
        <AppBar title="Kanban" iconClassNameRight="muidocs-icon-navigation-expand-more" id="appBar" />

        {this.renderStages()}
      </section>
    );
  }
};

export default IndexComponent;
