import React, { Component } from 'react';
import ColorBox from '../ColorBox';
import Navbar from './../Navbar';
import './Palette.css';

class Palette extends Component {

  state = {
    level: 500,
    format: "hex", 
  }

  // function to change color level
  changeLevel = level => {
    this.setState({ level });
  }

  // function to change the color's format; will grab value from the navbar select box and change the format in this component
  // format is then used below in the "ColorBox" component
  changeFormat = value => {
    this.setState({ format: value });
  }

  render() {

    // console.log(this.props.colors);
    // -for every palette in seedColors, render a color box for each of the palette's colors
    // -we want to be able to change the number in the square brackets so we get different shades of colors
    // -we're going to use an npm package called "react-component slider" (https://github.com/react-component/slider)
    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    const allColors = colors[level].map(color => 
      <ColorBox color={color[format]} name={color.name} key={color.id} /> 
    );

    return (
      <div className="Palette">
        {/* Navbar will go here */}
        {/* Pass down the level and the changeLevel function */}
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />

        {/* Palette's color boxes */}
        <div className="Palette-colors">{allColors}</div>

        {/* Footer will go here */}
        <footer className="Palette-footer">
          {paletteName}
          <span className="Palette-emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
