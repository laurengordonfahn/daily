import React from 'react';

import DayBox from './dayBox';

class Month extends React.Component {

    constructor (){
        super();
        
       
    }

     
    render(){
        return(

            <div className="month">

                <div className="monthHeader">
                        
                    {this.state.month} <br />

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

                <ul> 
                    
                    {(this.state.dateStore).map((elem) => {
                      const dayDate = this.props.detail;
                      const colorHex = this.state.dateStore[dayDate][color];
                      <DayBox key={elem} detail={elem} style={`background-color=${colorHex}`} handleColorChange={this.props.handleColorChange(e, dayDate)} />
                    })}
                   
                </ul>

            </div>

        )

    }




}



export default Month;