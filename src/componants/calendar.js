import React from 'react';

import * from Date;


class Calendar extends React.Component{

    constructor(){
        super();


    }

    state = {
        user : null;
        today : null;
        monthName : null;
        yearName : null;

        // all dates in the database
        dateStore: []; 

        //all date month and years in database month/year 
        dateRange:[]

        //on sign in auto to today's month can change from 'present' to a month/year setting that user requests
        view : [];  
    };

    componentWillMount(){
        this.renderDate();
        this.fillDateStore();

    }

    ////// componentWillMount ///////
    renderMonth() {
        const today = new Date();

        this.setState({ today })
        const this.setState({ month: today.Month() })
        const this.setState({year: today.Year()  })
        this.setState({view: [this.state.month, this.state.year]})

        $.ajax({
            url: "/month",
            dataType: 'json', 
            cache: false,
            data: {month: this.state.month, year: this.state.year},
            success: function(response) {
                //TODO date: {adj: [adj,adj, adj], color:#hex}
                // TODO check what happens when no response content
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

    handleDateSelection(){
        ///TODO How to select and change view of what is being seen and re reneder month
    }
    


    render(){
        return(

            <div>

                < SignIn />
                < SignOut />
                < Profile />
                < SelectView onDateSelection={this.handleDateSelection} />
                < Month />

            </div>

            )
    }

}

export default Calendar 