import React from "react";

import $ from "jquery";

import SignOut from "./notices";
import Month from "./month";
import SelectView from "./selectview";
import Profile from "./profile";
import Notices from "./notices";

class Calendar extends React.Component {
    constructor() {
        super();
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
        this.renderDateContent();
        this.fillDateRange();
        this.fillDateArray();
    }

    ////// componentWillMount ///////
    renderDateContent() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const dateRange = [month.toString() + "/" + year.toString()];

        this.setState({ today });
        this.setState({ month });
        this.setState({ year });
        this.setState({ dateRange });
        this.setState({ view: [month, year] });

        console.log({ dateRange });

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
                    this.setState({ dateContent: dContent });
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

    fillDateArray() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
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

    handleDateSelection(event) {
        const dateSelected = [event.target.value];
        this.setState({ view: dateSelected });

        $.ajax({
            url: "/view",
            dataType: "json",
            cache: false,
            data: { dateRequest: this.state.view },
            success: function(response) {
                //TODO dateHistory: [month/year, month, year]
                // TODO check what happens when no response content

                this.setState({ dateArray: response.dateArray });
                this.setState({ dayContent: response.dayContent });
                this.setState({ month: response.month });
                this.setState({ year: response.year });
            }.bind(this)
        });
    }

    updateAdj(newVal, ElemName, dayDate) {
        // need to get only the state for the date working on make copy
        const dayState = { ...this.state.dayContent };
        // assign new value
        dayState.dayDate.ElemName = newVal;
        // need to update only the state that i am working on
        this.setState({ dayContent: dayState });
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
                    dateContent={this.state.dateContent}
                    updateAdj={this.updateAdj}
                    handleColorChange={this.handleColorChange}
                />
            </div>
        );
    }
}

export default Calendar;
