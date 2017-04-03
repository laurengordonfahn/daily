import React from 'react';

//TODO is this right????
import * from Date;

class Month extends React.Component {

    constructor (){
        super();
        // place methods here to bind 'this' to instance of Month component
       
        this.renderDate = this.renderDate.bind(this);
    }

     state = {
            year: null
            month: ""
            date: []
    };

    renderDate() {
        var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

        var d = new Date();

        this.setState({year: })


    }
    componentWillMount() {
        this.renderDate();
        
    }
        
    
    render(){
        return(

            <div className="month">

                <div className="monthHeader"
                        
                    {this.state.month}<br>

                    <span className="year">{this.state.year}</span>
                       
                </div>

                <ul className="weekdayNames">
                  <li>Mo</li>
                  <li>Tu</li>
                  <li>We</li>
                  <li>Th</li>
                  <li>Fr</li>
                  <li>Sa</li>
                  <li>Su</li>
                </ul>

                <ul className="dates"> 
                    {Object.keys(this.props.dates).map(this.renderDate)}
                    <DayBox />
                </ul>

            </div>

        )

    }




}



export default Month;