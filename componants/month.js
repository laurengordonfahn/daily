import React from 'react';


class Month extends React.Component {

    constructor (){
        super();
        // place methods here to bind 'this' to instance of Month component
        this.handlePrevMonth = this.handlePrevMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.renderDate = this.renderDate.bind(this);
    }

    render(){
        return(

            <div className="month">

                <div className="monthHeader"
                    <ul>
                        <li className="prev" onClick={this.handlePrevMonth}>&#10094;</li>
                        <li className="next" onClick={this.handleNextMonth}>&#10095;</li>
                        <li>

                            {/* TODO I have to figure out how the month and year will be fed in */}
                                {this.props.month}<br>

                            <span className="year">{this.props.year}</span>
                        </li>
                    </ul>
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