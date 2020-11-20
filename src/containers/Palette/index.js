import React, { Component } from 'react';
import ColorBox from './../../components/ColorBox';
import './Palette.css';

class Palette extends Component {
  render() {

    console.log(this.props.colors)
    // for every palette in seedColors, render a color box for each of the palette's colors
    const allColors = this.props.colors.map(color => 
      <ColorBox color={color.color} name={color.name} /> 
    );

    return (
      <div className="Palette">
        {/* Navbar will go here */}

        {/* Palette's color boxes */}
        <div className="Palette-colors">{allColors}</div>

        {/* Footer will go here */}
      </div>
    );
  }
}

export default Palette;
