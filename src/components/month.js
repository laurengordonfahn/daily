import React from "react";

import DayBox from "./dayBox";

class Month extends React.Component {
  constructor() {
    super();
    this.renderDayBox = this.renderDayBox.bind(this);
  }

  renderDayBox(dayDate) {
    // const colorHex = {this.state.dateContent[dayDate]['color']};
    // style=`background-color=${colorHex}`
    return (
      <DayBox
        key={dayDate}
        dayDate={dayDate}
        updateAdj={this.props.updateAdj}
      />
    );
  }

  render() {
    return (
      <div className="month">

        <div className="monthHeader">

          {this.state.month} <br />

          <span className="year">{this.state.year}</span>

        </div>

        <ul className="weekdayNames">
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
          <li>Su</li>
        </ul>

        <ul>

          {this.state.dateArray.map(this.renderDayBox)}

        </ul>

      </div>
    );
  }
}

export default Month;
