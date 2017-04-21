import React from 'react';

import DayBox from './dayBox';

class Month extends React.Component {

     
    render(){

        const dayDate = this.props.detail;
        const colorHex = this.state.dateStore[dayDate]['color'];

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
                      
                      return <DayBox key={elem} detail={elem} style={`background-color=${colorHex}`} handleColorChange={this.handleColorChange} />
                    })}
                   
                </ul>

            </div>

        )

    }




}



export default Month;