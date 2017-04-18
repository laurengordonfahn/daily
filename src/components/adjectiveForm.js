import React from 'react';
import InputAdjective from './inputAdjective';


class AdjectiveForm extends React.Component{
    
    constructor(){
        super();
        this.handleForm = this.handleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            adj1: null,
            adj2: null,
            adj3: null,
        }
    }

    //TODO FIX handleForm
    handleForm(event) {
        event.preventDefault();
        const { adj1, adj2, adj3 } = this.state;
        const date = this.props.date;
        this.context.updateDay(date, { adj1, adj2, adj3 })
    }

    udpdateAdj(adjIndex, value) {
        const newState = {};
        newState[adjIndex] = value;
        this.setState(newState)
    }

    render(){

        const dayDate= {this.props.dayDate};
        const info = {this.state.dateStore[dayDate]};
        const adjectiveArray = {Object.keys(info).filter((elem) => {return elem !== 'color';})};
        

        return (
            <form className="adjectiveForm" onSubmit={(event)=> this.handleForm}>

                <label> Add Your Daily Adjectives: </label>
                    {/* Remember to create Props for adjectes*/}
                    {adjectiveArray.forEach((elem) =>{
                        <InputAdjective name={elem} value={this.state.dateStore[dayDate][elem]} onChange={(val) => this.updateAdj({elem}, val)} />
                    } )}
                    

                <button type="submit"> Add Adjectives </button>
            </form>

            )
    }
}