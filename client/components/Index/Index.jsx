import React, { Component } from "react";
import _ from "lodash"

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import AppBar from "material-ui/lib/app-bar";

import Stage from "../Stage/stage";

import ReactDOM from "react-dom";
import dragula from "react-dragula";

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

    dragula(items);
  }

  render() {
    return (
      <section id="stagesContainer">
        <AppBar title="Kanban" iconClassNameRight="muidocs-icon-navigation-expand-more" />

        <Stage ref="stage_idea" stageName="Idea" stageDescription="Just wondering..." />
        <Stage ref="stage_design" stageName="Design" stageDescription="Work in progress" />
        <Stage ref="stage_in_progress" stageName="In Progress" stageDescription="Make it happen people" />
        <Stage ref="stage_acceptance" stageName="Acceptance" stageDescription="We're all just looking for acceptance" />
        <Stage ref="stage_deployed" stageName="Deployed" stageDescription="It's real and it's fantastic" />
      </section>
    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
