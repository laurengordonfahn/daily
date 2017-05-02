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
            return (elem !== "colorHex" && elem !=="colorEmot" && elem !=="colorHex" && elem !=="colorName" && elem !=="colorId") ;

        });
        

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
