import React, { Component } from 'react';
import MiniPalette from './../../components/MiniPalette';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  palettes: {
    // using the grid system here
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)", // <-- saying "you want 3 items going across, each one 30%"
    gridGap: "5%" // <-- the gap between items is 5%
  }
}

class PaletteList extends Component {
  render() {

    const { palettes, classes } = this.props;

    return (
      
      <div className={classes.root}>
        <div className={classes.container}>
          {/* Navbar */}
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          {/* Container for MiniPalettes */}
          <div className={classes.palettes}>
            {/* for each palette in seedColors, create a MiniPalette and pass the palette info as props*/}
            {palettes.map(palette => <MiniPalette {...palette} />)}
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);