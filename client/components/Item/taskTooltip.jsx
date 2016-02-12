import React, { Component } from "react";

class TaskTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.setState = this.setState.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip() {
    this.setState({open: true})
  }

  hideTooltip() {
    this.setState({open: false})
  }

  renderDone() {
    return <p>✅</p>
  }

  renderProgress(doneCount, totalCount) {
    return <p>({doneCount} / {totalCount})</p>
  }

  render() {
    var doneCount = this.props.doneCount;
    var totalCount = this.props.totalCount;
    var done = doneCount == totalCount;
    var tooltipText = done ? "All Ready!" : `${doneCount} of ${totalCount} tasks completed.`

    var open = this.state.open;
    var tooltipClasses = open ? "taskTooltip open" : "taskTooltip closed"
    if (done) {
      tooltipClasses += " done";
    }

    return (
      <div className="taskCompletion" onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
        <div className="taskTooltipContainer">
          { done ? this.renderDone() : this.renderProgress(doneCount, totalCount) }
          <div className={tooltipClasses}>{tooltipText}</div>
        </div>
      </div>
    )
  }
}

export default TaskTooltip;