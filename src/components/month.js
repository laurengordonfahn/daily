import React from "react";
import Table from "./table";
import SelectView from "./selectview";
import Profile from "./profile";
import SignOut from "./signOut";

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
          <div className="selectViewDiv">
            <SignOut onSignOut={this.props.onSignOut} />
            <Profile profile={this.props.profile} isLoggedIn={this.props.isLoggedIn} handleProfile={this.props.handleProfile} />
            <SelectView
                      dateOption={this.props.dateRange}
                      onDateSelection={this.props.onDateSelection}
            />
          </div>
          <div className="monthInfo">
            <h3 className="monthTitle"> {this.translateMonthName(month)} </h3> 

            <h3 className="year">{this.props.year}</h3>
          </div>

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
