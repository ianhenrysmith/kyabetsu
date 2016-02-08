import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

import Item from "../Item/item";

class StageComponent extends Component {
  render() {
    var description = this.props.stageDescription;
    var title = this.props.stageName;

    return (
      <Card className="stageCard">
        <CardHeader title={title} subtitle={description} />
        
        <div ref="items" className="itemsContainer">
          <Item itemName="Item 1" itemDescription="Some work" />
          
          <Item itemName="Item 2" itemDescription="Involves some lifting" />
          
          <Item itemName="Item 3" itemDescription="Can we make more of what time we have?" />
          
          <Item itemName="Item 4" itemDescription="An exceptional thing" />
          
          <Item itemName="Item 5" itemDescription="Newly contributed" />
        </div>
      </Card>
    );
  }
}

StageComponent.defaultProps = {
  items: []
};

export default StageComponent;
