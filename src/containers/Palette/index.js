import React, { Component } from 'react';
import ColorBox from '../ColorBox';
import Navbar from './../Navbar';
import PaletteFooter from './../../components/PaletteFooter';
import styles from './../../assets/styles/PaletteStyles.js';
import { withStyles } from '@material-ui/styles';


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
    // -we want to be able to change the number in the square brackets so we get different shades of colors
    // -we're going to use an npm package called "react-component slider" (https://github.com/react-component/slider)
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { level, format } = this.state;

    // -for every palette in seedColors, render a color box for each of the palette's colors
    const allColors = colors[level].map(color => 
      <ColorBox 
        color={color[format]} 
        name={color.name} 
        key={color.id} 
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette={true}
      /> 
    );

    return (
      <div className={classes.Palette}>
        {/* Navbar will go here */}
        {/* Pass down the level and the changeLevel function */}
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors={true} />

        {/* Palette's color boxes */}
        <div className={classes.colors}>{allColors}</div>

        {/* Footer will go here */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
