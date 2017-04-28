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
        console.log({ dateOptions });

        return (
            <div>
                <h3> Change Month View </h3>
                <select
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
