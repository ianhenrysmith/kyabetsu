import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

import Item from "../Item/item";

import itemsStore from "../../stores/itemsStore";

class StageComponent extends Component {
  renderItems() {
    var items = itemsStore.getItemsForStageId(this.props.stage.shortname);

    return (
      <div className="itemsList itemsContainer" ref="items">
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

    return (
      <Card className="stageCard">
        <CardHeader title={stage.name} subtitle={stage.description} />
        
        {this.renderItems()}
      </Card>
    );
  }
}

export default StageComponent;
