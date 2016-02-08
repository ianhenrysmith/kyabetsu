import React, { Component } from "react";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

class ItemComponent extends Component {
  render() {
    var description = this.props.itemDescription;
    var title = this.props.itemName;

    return (
      <Card className="itemCard gu-draggable">
        <CardHeader title={title} subtitle={description} />
      </Card>
    );
  }
}

ItemComponent.defaultProps = {
  items: []
};

export default ItemComponent;
