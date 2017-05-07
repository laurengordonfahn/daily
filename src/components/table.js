import React from "react";
import EmptyDay from "./emptyDay";
import DayBox from "./dayBox";
import SelectView from "./selectview";

class Table extends React.Component {
  constructor() {
    super();
    this.renderDayBox = this.renderDayBox.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }

  renderDayBox(elem) {
    // const colorHex = this.props.dayContent[dayDate]['color'];
    // (a, b) => (
    //       <div>
    //       </div>
    //       )
    // (a, b) => {
    //   return a + b
    // }
    // (a, b) => {
    //   return a + b
    // }


    return elem.map((day, i) => {
      if (day === null || !day) {
        return (
            <td key={i}>
              <EmptyDay />
            </td>
          );
      } else {
        if (day === this.props.today) {
          return (
            <td key={i}>
              <DayBox
                className="today"
                dayDate={day}
                dayContent={this.props.dayContent}
                updateAdj={this.props.updateAdj}
                handleColorChange={this.props.handleColorChange}
                colorArr={this.props.colorArr}
              />
            </td>
          );
        } else {
          return (
            <td key={i}>
              <DayBox
                dayDate={day}
                dayContent={this.props.dayContent}
                updateAdj={this.props.updateAdj}
                handleColorChange={this.props.handleColorChange}
                colorArr={this.props.colorArr}
              />
            </td>
          );
        }
      }
    });
  }

  fillTable(dayContent, dateArray) {
    console.log({ dayContent });
    console.log({dateArray});
    console.log(dateArray[0]);
    const firstDay = dateArray[0];
    console.log({ firstDay });
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

    console.log({calendarFill})
    return calendarFill.map(elem => (
      <tr key={calendarFill.indexOf(elem)}>
        {this.renderDayBox(elem)}
      </tr>
    ));
  }

  render() {
    console.log('in table render', this.props.dayContent)
    if (!Object.keys(this.props.dayContent).length) return <div />;
    console.log(1);
    const dateArray = this.props.dateArray;
    const dayContent = this.props.dayContent;
    const updateAdj = this.props.updateAdj;
    const handleColorChange = this.props.handleColorChange;
    const colorArr = this.props.colorArr;

    return (
      <table>
        <thead>
          <tr className="weekdayNames">
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th>Su</th>
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
