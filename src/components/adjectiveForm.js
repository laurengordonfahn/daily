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
        console.log({dayDate});
        const info = this.props.dayContent[dayDate];
        console.log({info});
        console.log("info Keyes", Object.keys(info));
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

export default AdjectiveForm;
