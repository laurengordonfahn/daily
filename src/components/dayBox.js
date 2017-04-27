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
                    dateContent={this.props.dateContent}
                    updateAdj={this.props.updateAdj}
                />
                <ColorSelect
                    dayDate={dayDate}
                    dateContent={this.props.dateContent}
                    handleColorChange={this.handleColorChange}
                />
            </div>
        );
    }
}

export default DayBox;
