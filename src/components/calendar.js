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
        this.renderDate = this.renderDate.bind(this);
        this.fillDateStore = this.fillDateStore.bind(this);
        this.handleDateSelection = this.handleDateSelection.bind(this);
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
        this.renderDate();
        this.fillDateStore();
    }

    ////// componentWillMount ///////
    renderDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        this.setState({ today });
        this.setState({ month });
        this.setState({ year });
        this.setState({ view: [month, year] });

        $.ajax({
            url: "/month",
            type: "post",
            dataType: "json",
            cache: false,
            data: { month: month, year: year },
            success: function(response) {
                let dContent = { ...this.state.dateContent };
                Object.keys(dContent).forEach(elem => {
                    return delete dContent.elem;
                });
                Object.keys(response).forEach(date => {
                    dContent[date] = response[date];
                });
                this.setState({ dateContent: dContent });
            }.bind(this)
        });
    }

    fillDateStore() {
        $.ajax({
            url: "/calendar",
            dataType: "json",
            cache: false,
            success: function(response) {
                // TODO check what happens when no response content
                console.log({ response });
                if (!response["status"]) {
                    let dRange = [];
                    response["dateRange"].forEach(date => {
                        dRange.push(date);
                    });
                    console.log({ dRange });
                    this.setState({ dateRange: dRange });
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

    handleColorChange(event, dayDate) {
        const dayState = { ...this.state.dayContent };
        dayState.dayDate.color = event.target.value;
        this.setState({ dayContent: dayState });
    }

    render() {
        const statusMsg = this.state.statusMsg;
        return (
            <div>
                <Notices msg={statusMsg} clearStatus={this.props.clearStatus} />
                <SignOut onSignOut={this.props.onSignOut} />
                <Profile />
                <SelectView onDateSelection={this.handleDateSelection} />
                <Month handleColorChange={this.handleColorChange} />
            </div>
        );
    }
}

export default Calendar;
