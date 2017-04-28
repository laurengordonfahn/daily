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
    }

    ////// componentWillMount ///////
    setIntialDate() {

        // debug zone
        console.log("setIntial date is running and I am making a promise!");
        ///
        var promise = new Promise(function(resolve, reject){
            const today = new Date();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();

             const dateRange = [month.toString() + "/" + year.toString()];

            this.setState({ today });
            this.setState({ month });
            this.setState({ year });
            this.setState({ dateRange });
            this.setState({ view: [month, year] });

            if( this.state.view !==[] & this.state.dateRange !==[]){
                resolve("Stuff Worked!")

            } else {
                reject(Error("It broke"));
            }

        });

        promise.then(function(result) {
            this.renderDateContent(this.state.month, this.state.year);
            this.fillDateArray(this.state.month, this.state.year);

        })
        
    }

    renderDateContent(month, year) {

        console.log( "renderDateContent month, year",month, year );

        $.ajax({
            url: "/month/content",
            type: "post",
            dataType: "json",
            cache: false,
            data: { month: month, year: year },
            success: function(response) {
                if (response.status === "ok") {
                    //debug zone:
                    console.log("renderDateContent Response Running", {
                        response
                    });
                    ///
                    let dContent = { ...this.state.dateContent };
                    let dayContent = response["dayContent"];
                    Object.keys(dContent).forEach(elem => {
                        return delete dContent.elem;
                    });
                    Object.keys(dayContent).forEach(date => {
                        dContent[date] = dayContent[date];
                    });
                    this.setState({ dayContent: dContent });
                    console.log(
                        "dayContent after updated",
                        this.state.dayContent
                    );
                }
            }.bind(this)
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
        ///
        $.ajax({
            url: "/month/adj",
            dataType: "json",
            type: "post",
            cache: false,
            data: { "dayDate": dayDate, "newVal" : newVal, "ElemName" : ElemName },
            success: function(response) {
                const dayState = { ...this.state.dayContent };

                console.log("dayContent", this.state.dayContent);

                dayState[dayDate][ElemName] = newVal;
        
                this.setState({ dayContent: dayState });
                
            }.bind(this)
        });
        
    }

    handleColorChange(event, dayDate) {
        const dayState = { ...this.state.dayContent };
        dayState.dayDate.color = event.target.value;
        this.setState({ dayContent: dayState });
    }

    render() {
        return (
            <div>
                <Notices
                    msg={this.props.msg}
                    clearStatus={this.props.clearStatus}
                />
                <SignOut onSignOut={this.props.onSignOut} />
                <Profile />
                <SelectView
                    dateOption={this.state.dateRange}
                    onDateSelection={this.handleDateSelection}
                />
                <Month
                    month={this.state.month}
                    year={this.state.year}
                    dateArray={this.state.dateArray}
                    dayContent={this.state.dayContent}
                    updateAdj={this.updateAdj}
                    handleColorChange={this.handleColorChange}
                />
            </div>
        );
    }
}

export default Calendar;
