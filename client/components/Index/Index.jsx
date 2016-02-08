import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import AppBar from 'material-ui/lib/app-bar';

import Stage from '../Stage/stage';

class IndexComponent extends Component {
  render() {
    return (
      <section id="stagesContainer">
        <AppBar title="Kanban" iconClassNameRight="muidocs-icon-navigation-expand-more" />

        <Stage stageName="Idea" stageDescription="Just wondering..." />
        <Stage stageName="Design" stageDescription="Work in progress" />
        <Stage stageName="In Progress" stageDescription="Make it happen people" />
        <Stage stageName="Acceptance" stageDescription="We're all just looking for acceptance" />
        <Stage stageName="Deployed" stageDescription="It's real and it's fantastic" />
      </section>
    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;
