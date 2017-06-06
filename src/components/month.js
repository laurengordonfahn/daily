import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
import SelectView from "./selectview";
import Profile from "./profile";
import SignOut from "./signOut";

class Month extends React.Component {
  
  constructor  (){
      super();
      this.translateMonthName = this.translateMonthName.bind(this);
  }

  static propTypes = {
    // all dates in the database "d/m/y": {adj1:adj, adj2:adj, adj3:adj, colorSet:hex}
    dayContent: PropTypes.objectOf(PropTypes.shape({
      adj1: PropTypes.string.isRequired,
      adj2: PropTypes.string.isRequired,
      adj3: PropTypes.string.isRequired,
      colorSet: PropTypes.string,
    })),
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
            <h3 className="monthTitle"> {this.translateMonthName(month -1)} </h3>

            <h3 className="year">{this.props.year}</h3>
          </div>

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

Month.propTypes ={
  month: PropTypes.number,
  onSingOut: PropTypes.func,
  profile: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  handleProfile: PropTypes.func,
  dateRange: PropTypes.arrayOf(PropTypes.string),
  onDateSelection: PropTypes.func,
  year: PropTypes.number,
  dateArray: PropTypes.arrayOf(PropTypes.string),
  dayContent: PropTypes.objectOf(PropTypes.object),
  updateAdj: PropTypes.func,
  handleColorChange: PropTypes.func,
  colorArr: PropTypes.arrayOf(PropTypes.object)
};

export default Month;
