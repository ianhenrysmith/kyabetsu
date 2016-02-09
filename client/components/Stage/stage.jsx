import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import Badge from 'material-ui/lib/badge';

// import Item from "../Item/item";

class StageComponent extends Component {

  renderItems(stage, items) {
    return (
      <div className="itemsContainer itemsList" data-stage-id={stage.shortname} ref="items">
        {
          _.map(items, function(item) {
            return (
              <Card className="itemCard gu-draggable" data-item-id={item.id}>
                <CardHeader title={item.name} subtitle={item.description} />
              </Card>

              // <div className="itemCard gu-draggable" data-item-id="1">
              //   <div className="inner">
              //     <div title="Smoothies" className="itemTitle">
              //       <div className="itemWrapper">
              //         <span className="itemText">
              //           {item.name}
              //         </span>
              //         <span className="itemSmallerText">
              //           {item.description}
              //         </span>
              //       </div>
              //     </div>
              //   </div>
              // </div>

              // <p className="itemCard gu-draggable" data-item-id={item.id}>{item.name} - {item.description}</p>
            )
          })
        }
      </div>
    )
  }

  renderEmpty(stage) {
    return (
      <div className="itemsContainer itemsList" data-stage-id={stage.shortname} ref="items">
        <p></p>
      </div>
    )
  }

  render() {
    var stage = this.props.stage;
    var items = this.props.items;

    return (
      <div className="stageContainer">
        <Badge badgeContent={_.size(items)} primary={true} className="contentCount" />
        <Card className="stageCard">
          <CardHeader title={stage.name} subtitle={stage.description} />
          
          { (_.size(items) > 0) ? this.renderItems(stage, items) : this.renderEmpty(stage) }
        </Card>
      </div>
    );
  }
}

export default StageComponent;
