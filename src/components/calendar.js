import React from "react";

import $ from "jquery";

import SignOut from "./signOut";
import Month from "./month";
import SelectView from "./selectview";
import Profile from "./profile";
import Notices from "./notices";

class Calendar extends React.Component {
    constructor() {
        super();
        this.setIntialDate = this.setIntialDate.bind(this);
        this.renderDateContent = this.renderDateContent.bind(this);
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
                this.renderDateContent(this.state.month, this.state.year);
                this.fillDateArray(this.state.month, this.state.year);
            }
        );
    }

    renderDateContent(month, year) {
        console.log("renderDateContent month, year", month, year);

        $.ajax({
            url: "/month/content",
            type: "post",
            dataType: "json",
            cache: false,
            data: { month: month, year: year }
        }).then(response => {
            if (response.status === "ok") {
                //debug zone:
                console.log("renderDateContent Response Running", {
                    response
                });
                ///
                this.setState({ dayContent: response["dayContent"] });
                console.log("dayContent after updated", this.state.dayContent);
            }
        });
    }

    fillDateRange() {
        $.ajax({
            url: "/calendar/options",
            cache: false,
            success: function(response) {
                // TODO check what happens when no response content
                //debug zone:
                console.log("fillDateRange Response Running", { response });
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
            }.bind(this)
        });
    }

    fillDateArray(month, year) {
        //debug zone:
        console.log("renderDateContent month, year", month, year);
        ///
        $.ajax({
            url: "/month/days",
            dataType: "json",
            data: { month: month, year: year },
            cache: false,
            success: function(response) {
                // TODO check what happens when no response content
                //debug zone:
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
            }.bind(this)
        });
    }

    fillColorArr(){
        $.ajax({
            url: "/calendar/color",
            cache: false,
        }).then(response => {
            if (response.status === "ok") {
                //debug zone:
                console.log("fillColorDict Response Running", {
                    response
                });
                ///
                this.setState({ colorArr: response["colorResponse"] });
                console.log("colorArr after updated", this.state.colorArr);
            }
        });

    }

    /// SelectView ////

    handleDateSelection(dateChosen) {
        const month = dateChosen.split("-")[0];
        const year = dateChosen.split("-")[1];

        this.setState({ view: [month, year] });
        this.setState({ month: month });
        this.setState({ year: year });

        this.renderDateContent(month, year);
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
        ///
        $.ajax({
            url: "/month/adj",
            dataType: "json",
            type: "post",
            cache: false,
            data: { dayDate: dayDate, newVal: newVal, ElemName: ElemName },
         });
    }
    //IN midst of chanign colorEmot to colorId
    handleColorChange(colorId, dayDate) {
        const dayState = { ...this.state.dayContent };

        dayState[dayDate]["colorId"] = colorId;
        this.setState({ dayContent: dayState });

        $.ajax({
            url: "/month/color",
            dataType: "json",
            type: "post",
            cache: false,
            data: { dayDate: dayDate, colorId: colorId },
            success: function(response) {
                console.log(response);
                // TODO at some point handle if response status is "error"
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <Notices
                    msg={this.props.msg}
                    clearStatus={this.props.clearStatus}
                />
            
                <Month
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
