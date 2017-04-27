import React from "react";
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
                name={elem}
                value={this.props.dateContent[dayDate][elem]}
                updateAdj={this.updateAdj}
            />
        );
    }

    render() {
        const dayDate = this.props.dayDate;
        const info = this.props.dateContent[dayDate];
        const adjectiveArray = Object.keys(info).filter(elem => {
            return elem !== "color";
        });
        console.log({ adjectiveArray });

        return (
            <form
                className="adjectiveForm"
                onSubmit={event => {
                    this.handleForm(event);
                }}
            >

                <label> Add Your Daily Adjectives: </label>

                {adjectiveArray.map(elem => {
                    return this.renderInputs(elem, dayDate);
                })}

                <button type="submit"> Add Adjectives </button>
            </form>
        );
    }
}

export default AdjectiveForm;
