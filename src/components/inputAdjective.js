import React from "react";

class InputAdjective extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    //TODO Understand this
    handleChange(event, adjIndex) {
        const newAdj = event.target.value;
        this.props.updateAdj(newAdj, adjIndex, this.props.dayDate);
    }

    render() {
        const adjValue = this.props.value;

        if (adjValue) {
            return (
                <input
                    type="text"
                    name={this.props.name}
                    value={adjValue}
                    onChange={e => {
                        this.handleChange(e, name);
                    }}
                />
            );
        } else {
            return (
                <input
                    type="text"
                    name={this.props.name}
                    placeholder="A Daily Adjective"
                    onChange={e => {
                        this.handleChange(e, name);
                    }}
                />
            );
        }
    }
}

export default InputAdjective;
