import React from "react";

import DayBox from "./dayBox";

class Month extends React.Component {
  constructor() {
    super();
    this.renderDayBox = this.renderDayBox.bind(this);
  }


  renderDayBox(dayDate) {
    // const colorHex = this.props.dayContent[dayDate]['color'];

    return (
      <DayBox
        key={dayDate}
        dayDate={dayDate}
        dayContent={this.props.dayContent}
        updateAdj={this.props.updateAdj}
      />
    );
  }

  render() {
    return (
      <div className="month">

        <div className="monthHeader">

          {this.props.month} <br />

          <span className="year">{this.props.year}</span>

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

          {this.props.dateArray.map(this.renderDayBox)}

        </ul>

      </div>
    );
  }
}

export default Month;
