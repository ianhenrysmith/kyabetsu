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
                <li key={"activity_" + item.id + _.random(0, 88888)}>{activity}</li>
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
      <div style={{margin: "20px"}}>
        <p style={{fontSize: "20px", marginBottom: "20px"}}>In {stage.name} for {daysInStage} days.</p>

        {this.renderActivity(item)}
      </div>
    );
  }
}

export default ItemProductionComponent;