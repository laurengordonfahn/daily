import React from 'react';

class InputAdjective extends React.Component {
    
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }



    render(){
        return(

            <input type="text" name={this.props.key} placeholder="A Daily Adjective" onChange={(e) =>this.handleChange(e)} />
            
            )
    }
}

export default InputAdjective;