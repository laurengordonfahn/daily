import React from "react";
import InputAdjective from "./inputAdjective";

class AdjectiveForm extends React.Component {
    constructor() {
        super();
        this.handleForm = this.handleForm.bind(this);
    }

    handleForm(event) {
        event.preventDefault();
    }

    render() {
        const dayDate = this.props.dayDate;
        const info = this.state.dateContent[dayDate];
        const adjectiveArray = Object.keys(info).filter(elem => {
            return elem !== "color";
        });

        return (
            <form
                className="adjectiveForm"
                onSubmit={event => {
                    this.handleForm;
                }}
            >

                <label> Add Your Daily Adjectives: </label>

                {adjectiveArray.forEach(elem => {
                    return (
                        <InputAdjective
                            name={elem}
                            value={this.state.dateContent[dayDate][elem]}
                            updateAdj={this.updateAdj}
                        />
                    );
                })}

                <button type="submit"> Add Adjectives </button>
            </form>
        );
    }
}

export default AdjectiveForm;
