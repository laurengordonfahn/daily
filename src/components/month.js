import React from "react";
import Table from "./table";

class Month extends React.Component {
  

  render() {

    return (
      <div className="month">

        <div className="monthHeader">

          {this.props.month} <br />

          <span className="year">{this.props.year}</span>

        </div>

        <Table      
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
