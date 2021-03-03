import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
  state = {
    newPaletteName: "",
  }

  componentDidMount() {
    // validation to check that the palette name is unique
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes, open } = this.props;
    const { newPaletteName } = this.state;

    return (
      <div>
        <CssBaseline />
        {/* The "AppBar" is what we see at the top; the purple bar */}
        <AppBar
          position='fixed'
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open 
          })}
        >
          <Toolbar disableGutters={!open}>
            {/* "IconButton" isn't actually an icon; it's telling you "this is a button where an icon will go"; you have to choose the icon that the button will use */}
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              {/* "MenuIcon" gives us the hamburger */}
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <TextValidator 
                label="Palette Name" 
                value={this.state.newPaletteName} 
                name="newPaletteName" 
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />
              <Button variant="contained" color="primary" type="submit">Save Palette</Button>
              <Link to="/">
                <Button variant="contained" color="secondary">Go Back</Button>
              </Link>
              
            </ValidatorForm> 
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
