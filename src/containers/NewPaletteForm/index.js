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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

// we're writing CSS in javascript so we can use dynamic values if we wanted to; this can help us with making things responsive
const drawerWidth = 400;

// "styles" is a function that accepts a "theme"; theme contains a bunch of useful things we don't have to create ourselves; it's part of material ui
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    // we're subtracting the height of the app bar from 100vh
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };

  state = {
    open: false,
    currentColor: "teal",
    newColorName: "",
    colors: this.props.palettes[0].colors,
  };

  componentDidMount() {
    // "value" will be whatever is in the input for the color name; we want to check the value to all of the values that are currently
    // in the "colors" state
    // validation to check for a unique color name
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    // validation to check that the color itself is unique
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  }

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    }
    this.setState({ colors: [...this.state.colors, newColor ], newColorName: "" });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  clearColors = () => {
    this.setState({ colors: [] });
  }

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

  handleSubmit = (newPaletteName) => {
    // get all the colors from the palette and pass it up to the parent (which in this case is "App")
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"), // <-- using a regular express to replace the spaces with a "-"
      colors: this.state.colors
    }

    this.props.savePalette(newPalette);

    // redirect back to the homepage
    this.props.history.push("/");
  }

  removeColor = colorName => {
    this.setState({
      // we're filtering out where color.name is colorName
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }

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
          classes={classes} 
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary" onClick={this.clearColors}>Clear Palette</Button>
            <Button variant="contained" color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>Random Color</Button>
          </div>
          
          {/* 'onChangeComplete' gets called whenever we call a new color */}
          <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={this.state.newColorName}
              name="newColorName"
              onChange={this.handleChange}
              // to make our own validator using react-material-ui-validator, we add our own validation rule to ValidatorForm in componentDidMount()
              // the order of the validators and error messages matter
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']} 
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={paletteIsFull}
              style={{ backgroundColor: paletteIsFull ? "grey" : this.state.currentColor} }
            >
              { paletteIsFull ? "Palette Full" : "Add Color" }
            </Button>
          </ValidatorForm>
          
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
          />
          
        </main>
      </div>
    );
  }
}

// "withStyles" has an option to use a default theme (the '{ withTheme: true }' part)
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
