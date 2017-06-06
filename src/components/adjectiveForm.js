import React from "react";
import PropTypes from 'prop-types';

import InputAdjective from "./inputAdjective";

class AdjectiveForm extends React.Component {
    constructor() {
        super();
        this.handleForm = this.handleForm.bind(this);
        this.renderInputs = this.renderInputs.bind(this);
    }

    handleForm(event) {
        event.preventDefault();
    }

    renderInputs(elem, dayDate) {
        return (
            <InputAdjective
                key={elem}
                name={elem}
                dayDate={dayDate}
                value={this.props.dayContent[dayDate][elem]}
                updateAdj={this.props.updateAdj}
            />
        );
    }

    render() {
        const dayDate = this.props.dayDate;
        const info = this.props.dayContent[dayDate];
        const adjectiveArray = Object.keys(info).filter(elem => {
            return (elem ==="adj1" || elem === "adj2" || elem ==="adj3") ;

        });
        

        return (
            <form
                className="adjectiveForm"
                onSubmit={event => {
                    this.handleForm(event);
                }}
            >

                {adjectiveArray.map(elem => {
                    return this.renderInputs(elem, dayDate);
                })}

                <button type="submit"> Add + </button>
            </form>
        );
    }
}

AdjectiveForm.propTypes = {
    dayContent: PropTypes.objectOf(PropTypes.object),
    updateAdj: PropTypes.func,
    dayDate: PropTypes.string
};

export default AdjectiveForm;
