import React, { Component } from 'react';
import ColorBox from '../ColorBox';
import Navbar from './../Navbar';
import './Palette.css';

class Palette extends Component {

  state = {
    level: 500,
  }

  // function to change color level
  changeLevel = level => {
    this.setState({ level });
  }

  render() {

    // console.log(this.props.colors);
    // -for every palette in seedColors, render a color box for each of the palette's colors
    // -we want to be able to change the number in the square brackets so we get different shades of colors
    // -we're going to use an npm package called "react-component slider" (https://github.com/react-component/slider)
    const { colors } = this.props.palette;
    const { level } = this.state;
    const allColors = colors[level].map(color => 
      <ColorBox color={color.hex} name={color.name} /> 
    );

    return (
      <div className="Palette">
        {/* Navbar will go here */}
        {/* Pass down the level and the changeLevel function */}
        <Navbar level={level} changeLevel={this.changeLevel} />

        {/* Palette's color boxes */}
        <div className="Palette-colors">{allColors}</div>

        {/* Footer will go here */}
      </div>
    );
  }
}

export default Palette;
