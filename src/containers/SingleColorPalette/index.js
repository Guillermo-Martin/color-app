import React, { Component } from 'react';
import ColorBox from './../ColorBox';
import Navbar from './../Navbar';
import PaletteFooter from './../../components/PaletteFooter';

class SingleColorPalette extends Component {
  // our shades never change; it's always the same 9 shades of a given color; so we can just add it to the instance of the class itself
  constructor(props) {
    super(props);
    // adding to the instance of the class itself
    // get the shades from 'this.props.palette' for the color we're looking for (which is in 'this.props.colorId')
    // by doing this, we're only gathering the shades one time and then us it over and over in render
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    // console.log(this._shades);
  }

  state = {
    format: "hex",
  }

  // take the palette and the color, find all of the colors that match the colorId inside of the palette
  gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    // return all shades of given color
    // we're removing the '50' shade because we're not going to use it
    return shades.slice(1);
  }

  changeFormat = value => {
    this.setState({ format: value });
  }

  render() {
    const { format } = this.state;
    const { paletteName, emoji } = this.props.palette;
    // for every shade in 'this._shades' make a color box;
    const colorBoxes = this._shades.map(color => (
      <ColorBox 
        key={color.id} 
        name={color.name} 
        color={color[format]} 
        showLink={false} />
    ));


    return (
      <div className="Palette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;

// we only want to get the shades for each individual color