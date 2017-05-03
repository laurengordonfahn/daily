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
        colorArr={this.props.colorArr}
        updateAdj={this.props.updateAdj}
        handleColorChange={this.props.handleColorChange}
        colorArr={this.props.colorArr}
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

        <tr className="weekdayNames">
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
          <th>Su</th>
        </tr>

        <tr>

          {this.props.dateArray.map(this.renderDayBox)}

        </tr>

      </div>
    );
  }
}

export default Month;
