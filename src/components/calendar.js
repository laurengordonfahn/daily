import React from 'react';

import $ from 'jquery';


import SignIn from './signIn';
import SignOut from './signOut';
import Month from './month';
import Profile from './profile';


class Calendar extends React.Component{

    constructor(){
        super();
        this.renderDate = this.renderDate.bind(this);
        this.fillDateStore = this.fillDateStore.bind(this);
        this.handleDateSelection = this.handleDateSelection.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        
    }

    state = {
        user : null,
        today : null,
        month : null,
        year : null,

        // all dates in the database "d/m/y": {adj1:adj, adj2:adj, adj3:adj, colorSet:hex}
        dayContent: {},
        // ["d/m/y ", "d/m/y"]

        dateArray: [], 

        //all date month and years in database month/year 
        dateRange:[],

        //on sign in auto to today's month can change from 'present' to a month/year setting that user requests
        view : []  
    };

    componentWillMount(){
        this.renderDate();
        this.fillDateStore();

    }

    ////// componentWillMount ///////
    renderDate() {
        const today = new Date();

        this.setState({ today })
        this.setState({ month: today.Month() })
        this.setState({year: today.Year()  })
        this.setState({view: [this.state.month, this.state.year]})

        $.ajax({
            url: "/month",
            dataType: 'json', 
            cache: false,
            data: {month: this.state.month, year: this.state.year},
            success: function(response) {
                //Complete setState below 
                this.setState({dateStore: response.date.keys() });

            }.bind(this)

        });

    }

    fillDateStore() {

        $.ajax({
            url: "/calendar",
            dataType: 'json', 
            cache: false,
            success: function(response) {
                //TODO dateHistory: [month/year, month, year]
                // TODO check what happens when no response content

                this.setState({dateRange: response.dateHistory });

            }.bind(this)

        });

    }

    /// SelectView ////

    handleDateSelection(event){
        const dateSelected = [event.target.value];
        // Is this copy necessary since I am over writing the entier thig
        const viewCopy = this.state.view.slice();
        this.setState({view: dateSelected})
        
    }
    
    handleColorChange(event, dayDate){
        const dayState = {...this.state.dayContent};
        dayState.dayDate.color = event.target.value;
        this.setState({dayContent : dayState});
    }


    render(){
        return(

            <div>

                < SignIn />
                < SignOut />
                < Profile />
                < SelectView onDateSelection={this.handleDateSelection} />
                < Month handleColorChange={this.handleColorChange(e, dayDate)} />

            </div>

            )
    }

}

export default Calendar 