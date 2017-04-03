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

        //on sign in auto to today's month can change from 'present' to a month/year setting that user requests
        view : "present";  
    };

    componentWillMount(){
        this.renderDate();
        this.fillDateStore();

    }

    renderDate() {
        var today = new Date();

        this.setState({ today })
        this.setState({ month: today.Month() })
        this.setState({year: today.Year()  })
    }

    render(){
        return(

            <div>

                < signIn />
                < signOut />
            {/*should i pass the entire dateStore to selectView?*/}
                < selectView dateOptions={this.state.dateStore} />
                < month monthName={this.state.monthName} yearName={this.state.yearName} today={this.state.today} />


            </div>

            )
    }

}

export default Calendar 