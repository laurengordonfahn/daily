import React from 'react';
import InputAdjective from './inputAdjective';


class AdjectiveForm extends React.Component{
    
    constructor(){
        super();
        this.handleForm = this.handleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    
    handleForm(event) {
        event.preventDefault();
        
    }

    updateAdj(adjIndex, value) {
        const newState = {};
        newState[adjIndex] = value;
        this.setState(newState);
    }

    render(){

        const dayDate= this.props.dayDate;
        const info = this.state.dateStore[dayDate];
        const adjectiveArray = Object.keys(info).filter((elem) => {return elem !== 'color';});
        

        return (
            <form className="adjectiveForm" onSubmit={(event)=> this.handleForm}>

                <label> Add Your Daily Adjectives: </label>
                    
                    {adjectiveArray.forEach((elem) => {
                        return <InputAdjective name={elem} value={this.state.dateStore[dayDate][elem]} onChange={(val) => this.updateAdj({elem}, val)} />
                    } )}
                    

                <button type="submit"> Add Adjectives </button>
            </form>

            )
    }
}

export default AdjectiveForm;