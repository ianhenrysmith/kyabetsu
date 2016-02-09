import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Badge from 'material-ui/lib/badge';

import Item from "../Item/item";

import itemsStore from "../../stores/itemsStore";

class StageComponent extends Component {
  renderItems(stage, items) {
    return (
      <div className="itemsList itemsContainer" ref="items" data-stage-id={stage.shortname}>
        {
          _.map(items, function(item) {
            return (
              <Item item={item} />
            )
          })
        }
      </div>
    )
  }

  render() {
    var stage = this.props.stage;
    var items = itemsStore.getItemsForStageId(stage.shortname);

    return (
      <div className="stageContainer">
        <Badge badgeContent={_.size(items)} primary={true} className="contentCount" />
        <Card className="stageCard">
          <CardHeader title={stage.name} subtitle={stage.description} />
          
          {this.renderItems(stage, items)}
        </Card>
      </div>
    );
  }
}

export default StageComponent;
