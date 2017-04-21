import React from 'react';

class SelectView extends React.Component {
    
    constructor(){
        super();

        this.handleDateSelection = this.handleDateSelection.bind(this);
        
    }

    handleDateSelection(event) {
        const dateChosen = event.target.value;
        this.props.handleDateSelection(dateChosen);
    }

    render(){

        const dateOptions = this.state.dateRange;

        return(

            <select onChange={(e) => {this.handleDateSelection(e)}} >

                {dateOptions.forEach((date) => 
                <option value={date}> {date} </option>
                )}
        
            </select>
            
        )
    }
}

export default SelectView;