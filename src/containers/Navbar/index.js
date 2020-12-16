import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

  state = {
    format: "hex",
  }

  handleChange = event => {
    this.setState({ format: event.target.value });
    this.props.handleChange(event.target.value);
  }

  render() {
    // get level and changeLevel from props
    const { level, changeLevel } = this.props;

    const { format } = this.state;

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

        {/* Material UI Select */}
        <div className="Navbar-select-container">
          <Select value={format} onChange={this.handleChange}>
            {/* The values we want are: hex, rgb, rgba */}
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>

      </header>
    );
  }
}

export default Navbar;