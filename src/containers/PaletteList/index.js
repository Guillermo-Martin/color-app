import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './../MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from '../../assets/styles/PaletteListStyles.js';


class PaletteList extends Component {
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  }


  render() {

    const { palettes, classes, deletePalette } = this.props;

    return (
      
      <div className={classes.root}>
        <div className={classes.container}>
          {/* Navbar */}
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          {/* Container for MiniPalettes */}
          <div className={classes.palettes}>
            {/* for each palette in seedColors, create a MiniPalette and pass the palette info as props*/}
            {palettes.map(palette => 
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={deletePalette}
                key={palette.id}
                id={palette.id}
              />
            )}
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);