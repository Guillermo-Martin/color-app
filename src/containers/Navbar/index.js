import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
  render() {
    // get level and changeLevel from props
    const { level, changeLevel } = this.props;

    return (
      <header className="Navbar">
        {/* Logo */}
        <div className="Navbar-logo">
          <a href="#">reactcolorpicker</a>
        </div>

        {/* Slider */}
        {/* 1.  connect the slider with the numbers for colors */}
        {/* -create state to keep track of the number */}
        {/* -change the state when the slider value changes; per docs, it's "onAfterChange"*/}
        <div className="Navbar-slider-container">
          <span>Level: {level}</span>
          <div className="Navbar-slider">
            <Slider 
              defaultValue={level} 
              min={100} 
              max={900} 
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        

      </header>
    );
  }
}

export default Navbar;