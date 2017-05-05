import React from "react";
import Table from "./table";

class Month extends React.Component {
  
  constructor  (){
      super();
      this.translateMonthName = this.translateMonthName.bind(this);
  }

  translateMonthName (month){
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"]
    return months[month];

  }

  render() {

    const month =  this.props.month;

    return (
      <div className="monthBox">

        <div className="monthHeader">

          <h3 className="monthTitle"> {this.translateMonthName(month)} </h3> <br />

          <span className="year"><h3>{this.props.year}</h3></span>

        </div>

        <Table   
            today={this.props.today}   
            dateArray={this.props.dateArray}
            dayContent={this.props.dayContent}
            updateAdj={this.props.updateAdj}
            handleColorChange={this.props.handleColorChange}
            colorArr={this.props.colorArr}
        />

      </div>
    );
  }
}

export default Month;
