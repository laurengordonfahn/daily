import React from "react";
import EmptyDay from "./emptyDay"
import DayBox from "./dayBox";

class Table extends React.Component {

    constructor() {
    super();
    this.renderDayBox = this.renderDayBox.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }


  renderDayBox(dayDate) {
    // const colorHex = this.props.dayContent[dayDate]['color'];
    return (
      <DayBox
        key={dayDate}
        dayDate={dayDate}
        dayContent={this.props.dayContent}
        updateAdj={this.props.updateAdj}
        handleColorChange={this.props.handleColorChange}
        colorArr={this.props.colorArr}
      />
    );
  }

  // for(let startDay=0; startDay<7; startDay++){
        //     if(dateArray[0].weekday === startDay){ 

        //         for(elem in dateArray){

        //         }

        //         calendarRow=[]
        //         for(let emptyDay=0; emptyDay < startDay; emptyDay++){
        //             calendarRow.push(Null); 
        //         }
        //         for (let dayLeft=0; dayLeft< (7-startDay); dayLeft++){
        //             for (elem)

        //         }

  fillTable(dayContent){
    const dateArray= Object.keys(dayContent);
    const startDay = dateArray[0].weekday;
    let calendarFill = []
    for(i=0; i < 35 ; i ++){
        let emptyDay = 0
        for(j=0; j<7 ; j++){
            let row=[];

            if (emptyDay < startDay && i < 7 ){
                row.push(null);
                emptyDay ++
            }
            else if (i > dateArray.length && i < 31){
                row.push(null);
            } else {
                row.push(dateArray[i]);
            }
        }
        calendarFill.push(row);

    }

    

        
                    <tr>
                        <td> </td>
                        {this.props.dateArray.map(this.renderDayBox)}
                    </tr>
                }
            }
        }
  }

    render() {
        const dateArray=this.props.dateArray;
        const dayContent=this.props.dayContent;
        const updateAdj=this.props.updateAdj;
        const handleColorChange=this.props.handleColorChange;
        const colorArr=this.props.colorArr;

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
                <tr>

                  {this.fillTable(dayContent)}

                </tr>
            </tbody>
        </table>

      
    );
  }
}



export default Table;
