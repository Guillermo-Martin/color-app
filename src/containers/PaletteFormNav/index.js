import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from './../PaletteMetaForm';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import styles from './../../assets/styles/PaletteFormNavStyles';


class PaletteFormNav extends Component {
  state = {
    newPaletteName: "",
    formShowing: false,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  showForm = () => {
    this.setState({ formShowing: true });
  }

  hideForm = () => {
    this.setState({ formShowing: false });
  }

  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    const { newPaletteName } = this.state;

    return (
      <div className={classes.root}>
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
              className={classNames(classes.menuButton, {
                [classes.hide]: open, // <-- apply "classes.hide" if "open" is true
              })}
            >
            
              <AddToPhotosIcon />

            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            
            <Link to="/">
              <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
            </Link>
            <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
              Save
            </Button>
          </div>
        </AppBar>
        { this.state.formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} /> }
      </div>
    );
  }
}

// "withStyles" has an option to use a default theme (the '{ withTheme: true }' part)
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
