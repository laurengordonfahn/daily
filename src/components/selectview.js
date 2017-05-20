import React from "react";

class SelectView extends React.Component {
    constructor() {
        super();

        this.handleDateSelection = this.handleDateSelection.bind(this);
    }

    handleDateSelection(event) {
        const dateChosen = event.target.value;
        this.props.handleDateSelection(dateChosen);
    }

    render() {
        const dateOptions = this.props.dateOption;

        return (
            <div className="selectView">
               
                <select id="selectViewSelect"
                    onChange={e => {
                        this.handleDateSelection(e);
                    }}
                >

                    {dateOptions.map(date => {
                        return <option key={date} value={date}> {date} </option>;
                    })}

                </select>
            </div>
        );
    }
}

export default SelectView;
