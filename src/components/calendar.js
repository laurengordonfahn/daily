import React from "react";

// import $ from "jquery";

import Month from "./month";
import Notices from "./notices";

import * as api from '../api'

class Calendar extends React.Component {
    constructor() {
        super();
        this.setIntialDate = this.setIntialDate.bind(this);
        this.fillDateContent = this.fillDateContent.bind(this);
        this.fillDateRange = this.fillDateRange.bind(this);
        this.fillDateArray = this.fillDateArray.bind(this);
        this.fillColorArr = this.fillColorArr.bind(this);
        this.handleDateSelection = this.handleDateSelection.bind(this);
        // month componenet
        this.updateAdj = this.updateAdj.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    state = {
        today: null,
        month: null,
        year: null,

        // all dates in the database "d/m/y": {adj1:adj, adj2:adj, adj3:adj, colorSet:hex}
        dayContent: {},
        
        // [{id: int, colorHex: hex, colorName: color, emotion: emotion, basic: 0 or user_id }]
        colorArr: [],

        // ["d/m/y ", "d/m/y"]
        dateArray: [],

        //all date month and years in database month/year
        dateRange: [],

        //on sign in auto to today's month can change from 'present' to a month/year setting that user requests
        view: []
    };

    componentWillMount() {
        this.setIntialDate();
        this.fillDateRange();
        this.fillColorArr();
    }

    ////// componentWillMount ///////
    setIntialDate() {
        // debug zone
        console.log("setIntial date is running 3");
        ///
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const dateRange = [month.toString() + "/" + year.toString()];

        this.setState(
            { today, month, year, dateRange, view: [month, year] },
            () => {
                this.fillDateContent(this.state.month, this.state.year);
                this.fillDateArray(this.state.month, this.state.year);
            }
        );
    }
    
    fillDateContentSuccess(response) {
        console.log("fillDateContentSuccess month, year", this.state.month, this.state.year);

        if (response.status === "ok") {
            //debug zone:
            console.log("fillDateContent Response Running", {
                response
            });
            ///
            this.setState({ dayContent: response["dayContent"] });
            console.log("dayContent after updated", this.state.dayContent);
        }
    
    }

    fillDateContent(month, year) {
        api.dateContent(month, year)
            .then(response => this.fillDateContentSuccess(response))
    }


    fillDateRangeSuccess(response) {
        console.log("fillDateRangeSuccess Response Running", { response });
        ///
        if (response["status"] === "ok") {
            let dRange = this.state.dateRange.slice();
            for (var i = 0; i < dRange.length; i++) {
                dRange.pop();
            }
            response["dateRange"].forEach(date => {
                dRange.push(date);
            });
            console.log({ dRange });
            this.setState({ dateRange: dRange });
        }
    }

    fillDateRange() {
        api.dateRange()
            .then(response => this.fillDateContentSuccess(response))
    }

    fillDateArraySuccess(response) {
        //debug zone:
        console.log("fillDateContentSuccess month, year", this.state.month, this.state.year);
        ///
        
        console.log("fillDateArray Response Running", { response });
        ///
        if (response["status"] === "ok") {
            let days = this.state.dateArray.slice();
            for (var i = 0; i < days.length; i++) {
                days.pop();
            }
            response["dateArray"].forEach(date => {
                days.push(date);
            });
            console.log({ days });
            this.setState({ dateArray: days });
            console.log(
                " dateArray at end of fillDateArray ",
                this.state.dateArray
            );
        }
    
    }

    fillDateArray (month, year) {
        api.dateArray(month, year)
            .then(response => this.fillDateArraySuccess(response))
    }

    fillColorArrSuccess(response){
       
        if (response.status === "ok") {
            //debug zone:
            console.log("fillColorDict Response Running", {
                response
            });
            ///
            this.setState({ colorArr: response["colorResponse"] });
            console.log("colorArr after updated", this.state.colorArr);
        } 

    }

    fillColorArr(){
        api.colorArr()
            .then(response => this.fillColorArrSuccess(response))
    }

    /// SelectView ////

    handleDateSelection(dateChosen) {
        const month = dateChosen.split("-")[0];
        const year = dateChosen.split("-")[1];

        this.setState({ view: [month, year] });
        this.setState({ month: month });
        this.setState({ year: year });

        this.fillDateContent(month, year);
        this.fillDateArray(month, year);
    }

    updateAdj(newVal, ElemName, dayDate) {
        //debugger zone
        console.log(
            "updateAjd in calender.js",
            { newVal },
            { ElemName },
            { dayDate }
        );

        const dayState = { ...this.state.dayContent };

        console.log("dayContent", this.state.dayContent);

        dayState[dayDate][ElemName] = newVal;

        this.setState({ dayContent: dayState });
        
        api.updateAdjDB( dayDate, newVal, ElemName )
        
    }

    //IN midst of chanign colorEmot to colorId
    handleColorChangeSuccess(response) {
        console.log(response);
    }

    handleColorChange(colorId, dayDate){
        const dayState = { ...this.state.dayContent };

        dayState[dayDate]["colorId"] = colorId;
        this.setState({ dayContent: dayState });

        api.handleColorChangeDB(colorId, dayDate)
            .then(response => this.handleColorChangeSuccess(response))
    }

    render() {
        return (
            <div>
                <Notices
                    msg={this.props.msg}
                    clearStatus={this.props.clearStatus}
                />
            
                <Month
                    onSignOut={this.props.onSignOut}
                    dateRange={this.state.dateRange}
                    onDateSelection={this.handleDateSelection}
                    today={this.state.today}
                    month={this.state.month}
                    year={this.state.year}
                    dateArray={this.state.dateArray}
                    dayContent={this.state.dayContent}
                    updateAdj={this.updateAdj}
                    handleColorChange={this.handleColorChange}
                    colorArr={this.state.colorArr}
                />
            </div>
        );
    }
}

export default Calendar;
