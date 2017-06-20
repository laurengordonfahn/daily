import React from "react";
import PropTypes from 'prop-types';

class InputAdjective extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, adjIndex, dayDate) {
        const newAdj = event.target.value;
        
        this.props.updateAdj(newAdj, adjIndex, this.props.dayDate);
    }

    render() {
        const adjValue = this.props.value;
        const dayDate = this.props.dayDate;

        if (adjValue) {
            return (
                <input
                    className="adjInput"
                    type="text"
                    name={this.props.name}
                    value={adjValue}
                    onChange={e => {
                        this.handleChange(e, this.props.name, dayDate);
                    }}
                />
            );
        } else {
            return (
                <input
                    className="adjInput"
                    type="text"
                    name={this.props.name}
                    placeholder="A Daily Adjective"
                    onChange={e => {
                        this.handleChange(e, this.props.name, dayDate);
                    }}
                />
            );
        }
    }
}

InputAdjective.propTypes = {
    dayDate: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string
};

export default InputAdjective;
