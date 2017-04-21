import React from 'react';

class ColorSelect extends React.Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleSubmit(event){
    event.preventDefalut();

  }

  handleChange(event, dayDate){

    const colorChosen = event.target.value;

    this.props.handleColorChange(colorChosen, dayDate);
  }
  


  render() {

    const dayDate = this.props.dayDate;
    const colorChosen=this.state.dayContent.dayDate.color;
    
    return (
      
      <form onSubmit={this.handleSubmit}>
        <select value={colorChosen} onChange={(e)=>{this.handleChange(e, dayDate)}}>
          <option value="neutral" > Neutral - White </option>
          <option value="angry" > Angry - Red </option>
          <option value="happy" > Happy - Yellow </option>
          <option value="joyful" > Joyful - Soft Pink </option>
          <option value="calm" > Calm - Light Blue </option>
          <option value="sad" > Sad - Blue/Grey </option>
          <option value="quite" > Quite - Light Green </option>
          <option value="lonely" > Lonely - Light Purple </option>
          <option value="confussed" > Confussed - Vibrant Green  </option>
          <option value="anxious" > Anxious - Magenta </option>
          <option value="trapped" > Trapped - Orange </option>
        </select>
      </form>
      
    )
  }
}

export default ColorSelect;
