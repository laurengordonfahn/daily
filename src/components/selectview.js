import React from "react";
import PropTypes from 'prop-types';

class SelectView extends React.Component {
    constructor() {
        super();

        this.handleDateSelection = this.handleDateSelection.bind(this);
    }

    handleDateSelection(event) {
        const dateChosen = event.target.value;
        this.props.onDateSelection(dateChosen);
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

SelectView.propTypes = {
    onDateSelection: PropTypes.func,
    dateOptions: PropTypes.arrayOf(PropTypes.string)
};

export default SelectView;
