import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

  state = {
    format: "hex",
    open: false,
  }

  handleFormatChange = event => {
    this.setState({ format: event.target.value, open: true });
    this.props.handleChange(event.target.value);
  }

  closeSnackbar = () => {
    this.setState({ open: false });
  }

  render() {
    // get level and changeLevel from props
    const { level, changeLevel, showingAllColors } = this.props;

    const { format } = this.state;

    return (
      <header className="Navbar">
        {/* Logo */}
        <div className="Navbar-logo">
          <Link to="/">reactcolorpicker</Link>
        </div>

        {/* Slider */}
        {/* 1.  connect the slider with the numbers for colors */}
        {/* -create state to keep track of the number */}
        {/* -change the state when the slider value changes; per docs, it's "onAfterChange"*/}
        {/* if 'this.props.showingAllColors' is true, then show the slider; this syntax is like the ternary, but basically saying
        "if true, then display this thing" */}
        {showingAllColors && (
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
        )}
        

        {/* Material UI Select */}
        <div className="Navbar-select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            {/* The values we want are: hex, rgb, rgba */}
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>

      {/* Material UI Snackbar */}
      <Snackbar 
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={this.state.open}
        autoHideDuraton={3000}
        message={<span id="message-id">Format Changed to {format.toUpperCase()}!</span>}
        ContentProps={{ "aria-describedby": "message-id" }} // <--- for accessibility purposes
        onClose={this.closeSnackbar}
        action={[
          <IconButton 
            onClick={this.closeSnackbar} 
            color="inherit" 
            key="close" 
            aria-label="close" // <--- for accessiblity purposes
          >
            <CloseIcon />
          </IconButton>
        ]}
      />

      </header>
    );
  }
}

export default Navbar;