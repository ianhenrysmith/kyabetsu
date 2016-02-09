import React, { Component } from "react";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";

class ItemComponent extends Component {
  render() {
    var item = this.props.item;

    console.log("----", item)

    return (
      // <Card className="itemCard gu-draggable" data-item-id={item.id}>
      //   <CardHeader title={item.name} subtitle={item.description}></CardHeader>
      // </Card>
      // <p data-item-id={item.id}>{item.name}<span></span></p>
      // <div data-item-id={item.id}>
      //   <p>{item.name}</p>
      // </div>
    );
  }
}

export default ItemComponent;
