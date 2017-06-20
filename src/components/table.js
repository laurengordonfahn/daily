import React from "react";
import PropTypes from 'prop-types';

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
    if (!dayContent[firstDay]) return null;
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
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saterday</th>
            
          </tr>
        </thead>

        <tbody>

          {this.fillTable(dayContent, dateArray)}

        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dayContent: PropTypes.objectOf(PropTypes.object),
  updateAdj: PropTypes.func,
  handleColorChange: PropTypes.func,
  colorArr: PropTypes.arrayOf(PropTypes.object),
  dateArray: PropTypes.arrayOf(PropTypes.string)
};


export default Table;
