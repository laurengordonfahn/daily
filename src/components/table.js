import React from "react";
import EmptyDay from "./emptyDay";
import DayBox from "./dayBox";


class Table extends React.Component {
  constructor() {
    super();
    this.renderDayBox = this.renderDayBox.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }

  renderDayBox(elem) {

    return elem.map((day, i) => {
      const today = new Date();
      const todayDay = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear();

      if (day === null || !day) {
        return (
            <td key={i}>
              <EmptyDay />
            </td>
          );
      } else {
          return (
            <td key={i}>
              <DayBox
                isToday={todayDay === day}
                dayDate={day}
                dayContent={this.props.dayContent}
                updateAdj={this.props.updateAdj}
                handleColorChange={this.props.handleColorChange}
                colorArr={this.props.colorArr}
              />
            </td>
          );
        } 
    });
  }

  fillTable(dayContent, dateArray) {
    const firstDay = dateArray[0];
    const startDay = dayContent[firstDay]["weekday"];
    let calendarFill = [];
    let dayMonth = 0;
    for (let i = 0; i < 5; i++) {
      let emptyDay = 0;
      let row = [];

      for (let j = 0; j < 7; j++) {
        
        if (emptyDay < startDay && i < 1) {
          row.push(null);
          emptyDay++;
        } else {
          row.push(dateArray[dayMonth]);
          dayMonth ++;
        }
        
      }
      calendarFill.push(row);
    }

    return calendarFill.map(elem => (
      <tr key={calendarFill.indexOf(elem)}>
        {this.renderDayBox(elem)}
      </tr>
    ));
  }

  render() {
    if (!Object.keys(this.props.dayContent).length) return <div />;
    const dateArray = this.props.dateArray;
    const dayContent = this.props.dayContent;
    return (
      <table>
        <thead>
          <tr className="weekdayNames">
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            
          </tr>
        </thead>

        <tbody>

          {this.fillTable(dayContent, dateArray)}

        </tbody>
      </table>
    );
  }
}

export default Table;
