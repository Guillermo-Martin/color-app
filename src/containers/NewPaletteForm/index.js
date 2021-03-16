import React, { Component } from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from './../../components/DraggableColorList';
import PaletteFormNav from './../PaletteFormNav/';
import ColorPickerForm from './../ColorPickerForm';
import { arrayMove } from 'react-sortable-hoc';
import styles from './../../assets/styles/NewPaletteFormStyles';


class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  state = {
    open: false,
    colors: this.props.palettes[0].colors,
  };

  // function to open drawer
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  // function to close drawer
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // function to add new color
  addNewColor = newColor => {
    this.setState({ colors: [...this.state.colors, newColor ], newColorName: "" });
  }

  // function for inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // function to clear colors
  clearColors = () => {
    this.setState({ colors: [] });
  }

  // function to add random color
  addRandomColor = () => {
    // pick random color from existing palettes
    // combine colors from all palettes
    const allColors = this.props.palettes.map(p => p.colors).flat(); // <-- ".flat()" creates a new array w/all subarrays concatenated into it
    
    // generate a random number
    let rand = Math.floor(Math.random() * allColors.length);

    // get a random color
    const randomColor = allColors[rand];

    // add it to the existing colors
    this.setState({ colors: [...this.state.colors, randomColor] })
  }

  // function for handling submit
  handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-"); // <-- using a regular express to replace the spaces with a "-"
    newPalette.colors = this.state.colors;

    this.props.savePalette(newPalette);

    // redirect back to the homepage
    this.props.history.push("/");
  }

  // function to remove color
  removeColor = colorName => {
    this.setState({
      // we're filtering out where color.name is colorName
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }

  // function for dragging color
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  }


  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          palettes={palettes} 
          handleSubmit={this.handleSubmit} 
          handleDrawerOpen={this.handleDrawerOpen}
        />
      
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}  // <--- if "open" is "true", show the drawer; if "false", hide it
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {/* This is the top part of the drawer */}
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            {/* ===== BUTTONS ===== */}
            <div className={classes.buttons}>
              <Button variant="contained" color="secondary" onClick={this.clearColors} className={classes.button}>Clear Palette</Button>
              <Button variant="contained" color="primary" onClick={this.addRandomColor} className={classes.button} disabled={paletteIsFull}>Random Color</Button>
            </div>
            
            <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors}/>
          </div>
        </Drawer>
        
        {/* This is where all of the content will go */}
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          
          <DraggableColorList 
            colors={colors} 
            removeColor={this.removeColor} 
            axis="xy" // <--- for specifying how the draggable boxes work
            onSortEnd={this.onSortEnd} // <--- for specifying where to save new location of boxes
            distance={20}
          /> 
        </main>
      </div>
    );
  }
}

// "withStyles" has an option to use a default theme (the '{ withTheme: true }' part)
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
