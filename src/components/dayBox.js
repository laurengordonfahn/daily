import React from 'react';


import AdjectiveForm from './adjectiveForm';
import ColorSelect from './colorSelect';


class DayBox extends React.Component {
    constructor (){
        super();
    }

    render() {
        return (
            <div>
                <h3> {this.state.today} </h3>
                <AdjectiveForm />
                <ColorSelect />
            </div>
    )}
}

export default DayBox;
