import React from 'react';

class ColorSelect extends React.Component {
  render() {
    return (
      <select>

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
    )
  }
}

export default ColorSelect;
