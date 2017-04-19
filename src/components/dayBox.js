import React from 'react';


import AdjectiveForm from './adjectiveForm';
import ColorSelect from './colorSelect';


class DayBox extends React.Component {
    constructor (){
        super();
        
    }

    render() {
        const dayDate = {this.props.detail};

        return (
            <div>
                <h3> {dayDate} </h3>
           
                <AdjectiveForm dayDate={dayDate} />
                <ColorSelect  dayDate={dayDate} handleChange={this.props.handleColorChange(e, dayDate)} />
            </div>
    )}
}

export default DayBox;
