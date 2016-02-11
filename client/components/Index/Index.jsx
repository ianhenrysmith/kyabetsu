import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import itemsStore from "../../stores/itemsStore";
import stagesStore from "../../stores/stagesStore";

import AppBar from "material-ui/lib/app-bar";
import Stage from "../Stage/stage";


class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: itemsStore.getItems()};

    this.updateItems = this.updateItems.bind(this);
    this.setState = this.setState.bind(this);

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

export default DragDropContext(HTML5Backend)(IndexComponent);
