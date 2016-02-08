import React, { Component } from "react";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

class ItemComponent extends Component {
  render() {
    var item = this.props.item;

    return (
      <Card className="itemCard gu-draggable">
        <CardHeader title={item.name} subtitle={item.description} />
      </Card>
    );
  }
}

export default ItemComponent;
