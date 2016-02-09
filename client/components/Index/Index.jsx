import React, { Component } from "react";
import _ from "lodash"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import AppBar from "material-ui/lib/app-bar";

import Stage from "../Stage/stage";

import ReactDOM from "react-dom";
import dragula from "react-dragula";

import stagesStore from "../../stores/stagesStore";

class IndexComponent extends Component {
  componentDidMount() {
    var items = []

    var stageNames = [
      "stage_idea",
      "stage_design",
      "stage_in_progress",
      "stage_acceptance",
      "stage_deployed"
    ]

    var index = this;

    _.each(stageNames, function(stageName) {
      var stage = index.refs[stageName];

      items.push(ReactDOM.findDOMNode(stage.refs.items));
    });

    dragula(items)
      .on('drop', function (itemElement, targetContainer, sourceContainer) {
        console.log(itemElement.getAttribute("data-item-id"), targetContainer.getAttribute("data-stage-id"))
        return false;
      });
  }

  renderStages() {
    return (
      <div className="stages">
        {
          _.map(stagesStore.getStages(), function(stage) {
            return (
              <Stage ref={`stage_${stage.shortname}`} stage={stage} />
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
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
