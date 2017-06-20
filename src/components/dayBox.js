import React from "react";
import PropTypes from 'prop-types';

import AdjectiveForm from "./adjectiveForm";
import ColorSelect from "./colorSelect";

class DayBox extends React.Component {
    constructor(){
        super();
        this.colorIdConverter = this.colorIdConverter.bind(this);
    }

    colorIdConverter(dayDate){
        const colorId = (this.props.dayContent[dayDate]["colorId"] -1);
        const colorArr = this.props.colorArr;
        const colorHex = colorArr[colorId]["colorHex"];
        const colorStyle = {
            backgroundColor: colorHex
        }
        return colorStyle
    }

    render() {
        const dayDate = this.props.dayDate;
        const day = this.props.dayContent[dayDate]["day"];
        
        return (
            <div className={this.props.isToday ? "today day" : "day"} style={this.colorIdConverter(dayDate)} >
                <div className="dayDate"> {day} </div>

                <AdjectiveForm
                    dayDate={dayDate}
                    dayContent={this.props.dayContent}
                    updateAdj={this.props.updateAdj}
                />
                <ColorSelect
                    dayDate={dayDate}
                    dayContent={this.props.dayContent}
                    colorArr={this.props.colorArr}
                    handleColorChange={this.props.handleColorChange}
                />
            </div>
        );
    }
}

DayBox.propTypes = {
    dayContent: PropTypes.objectOf(PropTypes.object),
    colorArr: PropTypes.arrayOf(PropTypes.object),
    dayDate: PropTypes.string,
    isToday: PropTypes.bool.isRequired,
    updateAdj: PropTypes.func,
    handleColorChange: PropTypes.func
};
export default DayBox;
