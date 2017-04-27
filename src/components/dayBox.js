import React from "react";

import AdjectiveForm from "./adjectiveForm";
import ColorSelect from "./colorSelect";

class DayBox extends React.Component {
    render() {
        const dayDate = this.props.dayDate;

        return (
            <div>
                <h3> {dayDate} </h3>

                <AdjectiveForm
                    dayDate={dayDate}
                    updateAdj={this.props.updateAdj}
                />
                <ColorSelect
                    dayDate={dayDate}
                    handleColorChange={this.handleColorChange}
                />
            </div>
        );
    }
}

export default DayBox;
