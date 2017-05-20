import React from "react";

// import $ from "jquery";

import Month from "./month";
import Notices from "./notices";
import ProfilePage from "./profilePage"

import * as api from '../api'

class Calendar extends React.Component {
    constructor() {
        super();
        this.setIntialDate = this.setIntialDate.bind(this);
        this.fillDateContent = this.fillDateContent.bind(this);
        this.fillDateRange = this.fillDateRange.bind(this);
        this.fillDateArray = this.fillDateArray.bind(this);
        this.fillColorArr = this.fillColorArr.bind(this);
        // this.fillColorOrder = this.fillColorOrder.bind(this);
        //header month component
        this.handleDateSelection = this.handleDateSelection.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        // month component
        this.updateAdj = this.updateAdj.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    state = {
        today: null,
        month: null,
        year: null,
        profile: false,

        // all dates in the database "d/m/y": {adj1:adj, adj2:adj, adj3:adj, colorSet:hex}
        dayContent: {},
        
        // [{id: int, colorHex: hex, colorName: color, emotion: emotion, basic: 0 or user_id }]
        colorArr: [],

        // list of {colorId : emotion} order
        colorOrder: [],

        //{emotion: {emotions: [all other emotions], datab4: [], dataft:[], colorHexs:[]}, etc..}
        colorChart : {},

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

    // fillColorOrder(){
    //     console.log("Running fillColorOrder");
    //     const colorArr = this.state.colorArr;
    //     console.log({colorArr});
    //     let colorOrder = [];
    //     colorArr.forEach(function(colorDict) {
    //         let addDict = {}
    //         // const colorId = colorDict["id"];
    //         // const emotion = colorDict["emotion"];
    //         addDict[colorDict["colorId"]] = colorDict["emotion"]

    //         colorOrder.push(addDict);

    //     });
    //     this.setState({ colorOrder: colorOrder },
    //         () => {this.fillColorChart();}
    //     );

        
    // }

    fillColorArrSuccess(response) {
       //TODO why  won't the callback run? 
        
        if (response.status === "ok") {
            
            const colorArray = response["colorResponse"];
            let colorOrder = [];
            colorArray.forEach(function(colorDict) {
                let addDict = {}
                addDict[colorDict["colorId"]] = colorDict["emotion"]
                colorOrder.push(addDict);
                console.log("colorOrder in success", {colorOrder})
            });
            this.setState(
                { colorArr : colorArray, colorOrder : colorOrder}
            );

        } 
    }


    fillColorArr() {
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


    fillColorChartSuccess(response){
        const colorOrder = this.state.colorOrder;
        console.log("fillColorChart success", {colorOrder});
        const colorArr = this.state.colorArr;
        let emotionInfo = {};
        colorArr.forEach(function(colorDict) {
            const emotion = colorDict["emotion"];
            const colorHex = colorDict["colorHex"];
            const colorId = colorDict["colorId"];

            emotionInfo[colorDict["emotion"]] = {emotion, colorHex, colorId};


        });

        console.log({emotionInfo});
        console.log({response});
        //response = [emotion: {before:[- num], after: [+ num]}, etc]
        let colorHexs =[];
        
        response.forEach(function(emotionDict){
            const emotion = Object.keys(emotionDict)[0];
            colorHexs.push(emotionInfo[emotion]["colorHex"]);

            const colorId = emotionInfo[emotion]["colorId"];

 
        });
        console.log({colorHexs});

        let emotionArr = [];

        colorOrder.forEach(function(colorIdDict){
    
            emotionArr.push(Object.values(colorIdDict)[0]);
 
        });

        console.log({emotionArr});

        let colorChart = {};
        response.forEach(function(emotionDict){
            console.log("this is the emotion dict", emotionDict);
            const emotionName = Object.keys(emotionDict)[0];
            colorChart[emotionName] = {"after": emotionDict[emotionName]["after"], "before": emotionDict[emotionName]["before"],"colorHexs": colorHexs, "emotionArr" : emotionArr}
        });

        this.setState({colorChart: colorChart});
        console.log("fillColorChartSuccess", {colorChart});
        let profile = this.state.profile;
        this.setState({ profile: !profile });
    }

    fillColorChart() {
    
        api.colorChart()
            .then(response => this.fillColorChartSuccess(response))
   
    }

    // Profile //
    handleProfile(isLoggedIn) {
        const profile = this.state.profile;
        if (!profile && isLoggedIn ) {
            // false profile change to true shows profile
            this.fillColorChart();
        } 
        else if (profile && isLoggedIn ) {
            // true profile change to false shows calendar
            this.setState({ profile : !profile });
        }

    }

    //Day functionality

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
        const profile = this.state.profile;

        if (!profile) {
            return (
                <div>
                    <Notices
                        msg={this.props.msg}
                        clearStatus={this.props.clearStatus}
                    />
                
                    <Month
                        onSignOut={this.props.onSignOut}
                        handleProfile={this.handleProfile}
                        isLoggedIn={this.props.isLoggedIn}
                        profile={profile}
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
        return (
            <ProfilePage 
                profile={profile}
                colorChart={this.state.colorChart}
                handleProfile={this.handleProfile}
                isLoggedIn={this.props.isLoggedIn}
                onSignOut={this.props.onSignOut}

            />
        );
    }
}

export default Calendar;
