import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
// we can import colors from material ui
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import MiniPalette from './../MiniPalette';
import styles from '../../assets/styles/PaletteListStyles.js';


class PaletteList extends Component {
  state = {
    openDeleteDialog: false,
    deletingId: ""
  }

  // function to open dialog
  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }

  // function to close dialog
  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }

  // function to go to the specific palette
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  }

  // function to delete palette
  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }


  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;
 
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {/* Navbar */}
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          {/* Container for MiniPalettes */}
          
            <TransitionGroup className={classes.palettes}>
              {/* for each palette in seedColors, create a MiniPalette and pass the palette info as props*/}
              {palettes.map(palette => 
                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                  <MiniPalette
                    {...palette}
                    goToPalette={this.goToPalette}
                    openDialog={this.openDialog}
                    key={palette.id}
                    id={palette.id}
                  />
                </CSSTransition>
              )}
            </TransitionGroup> 
        </div>

        <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
