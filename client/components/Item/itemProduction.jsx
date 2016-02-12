import React, { Component } from "react";
import _ from "lodash";

class ItemProductionComponent extends Component {
  renderActivity(item) {
    return (
      <div>
        <ul>
          {
            _.map(item.activity, function(activity) {
              return (
                <li>{activity}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  render() {
    var daysInStage = this.props.item.daysInStage;
    
    var item = this.props.item;
    var stage = this.props.stage;

    return (
      <div>
        <p>In {stage.name} for {daysInStage} days.</p>

        {this.renderActivity(item)}
      </div>
    );
  }
}

export default ItemProductionComponent;