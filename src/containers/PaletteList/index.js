import React, { Component } from 'react';
import MiniPalette from './../../components/MiniPalette';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
  render() {

    const { palettes } = this.props;

    return (
      <div>
        <MiniPalette />
        <h1>React Colors</h1>
        {/* for each palette in seedColors, create a link */}
        {palettes.map(palette => <p><Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link></p>)}
      </div>
    );
  }
}

export default PaletteList;