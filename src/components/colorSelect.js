import React from "react";

class ColorSelect extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderColorOptions = this.renderColorOptions.bind(this);
  }

  handleSubmit(event) {
    event.preventDefalut();
  }

  handleChange(event, dayDate) {
    const colorId = event.target.value;

    this.props.handleColorChange(colorId, dayDate);
  }

  renderColorOptions(elem) {
    const emotion = elem["emotion"];
    // const colorHex = elem["colorHex"];
    const id = elem["colorId"];
    const colorName = elem["colorName"];
    // const basic = elem["basic"];
    const text = emotion.toUpperCase() + " - " + colorName.toUpperCase();

    return <option key={id} value={id}> {text} </option>;
  }

  render() {
    const dayDate = this.props.dayDate;
    const colorArr = this.props.colorArr;
    const colorId = this.props.dayContent[dayDate]["colorId"];

    return (
      <form
        onSubmit={event => {
          this.handleSubmit(event);
        }}
      >

        <select
          value={colorId}
          onChange={e => {
            this.handleChange(e, dayDate);
          }}
        >

          {colorArr.map(elem => {
            return this.renderColorOptions(elem);
          })}

        </select>
      </form>
    );
  }
}

export default ColorSelect;
