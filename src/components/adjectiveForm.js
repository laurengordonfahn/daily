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
        return (
            <form className="adjectiveForm" onSubmit={(event)=> this.handleForm}>

                <label> Add Your Daily Adjectives: </label>
                
                    <InputAdjective value={this.state.adj1} onChange={(val) => this.updateAdj('adj1', val)} />
                    <InputAdjective value={this.state.adj2 } onChange={(val) => this.updateAdj('adj2', val)} />
                    <InputAdjective value={this.state.adj3} onChange={(val) => this.updateAdj('adj3', val)} />

                <button type="submit"> Add Adjectives </button>
            </form>

            )
    }
}