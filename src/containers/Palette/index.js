import React, { Component } from 'react';
import ColorBox from '../ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';


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

        {/* Slider */}
        {/* 1.  connect the slider with the numbers for colors */}
        {/* -create state to keep track of the number */}
        {/* -change the state when the slider value changes; per docs, it's "onAfterChange"*/}
        <div className="Palette-slider">
          <Slider 
            defaultValue={level} 
            min={100} 
            max={900} 
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        

        {/* Palette's color boxes */}
        <div className="Palette-colors">{allColors}</div>

        {/* Footer will go here */}
      </div>
    );
  }
}

export default Palette;
