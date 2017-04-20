import React from 'react';

class SelectView extends React.Component {
    
    constructor(){
        super();
        
    }


    render(){

        const dateOptions = this.state.dateRange;

        return(

            <select onChange={this.props.handleDateSelection} >

                {dateOptions.forEach((date) => 
                <option value={date}> {date} </option>
                )}
        
            </select>
            
        )
    }
}

export default SelectView;