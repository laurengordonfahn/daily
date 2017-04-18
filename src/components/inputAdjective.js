import React from 'react';

class InputAdjective extends React.Component {
    
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);

    }

    //TODO Understand this
    handleChange(e) {
        this.props.onChange(e.target.value)
    }



    render(){
        return(

            <input type="text" name={this.props.name} placeholder="A Daily Adjective" onChange={(e) =>this.handleChange(e)} />
            
            )
    }
}

export default InputAdjective;