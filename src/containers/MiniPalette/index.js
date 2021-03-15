import React, { PureComponent } from 'react';
import styles from '../../assets/styles/MiniPaletteStyles.js';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
  deletePalette = event => {
    event.stopPropagation();
    this.props.openDialog(this.props.id);
  }

  handleClick = () => {
    this.props.goToPalette(this.props.id);
  }

  render() {
    const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
    console.log("RENDERING: ", paletteName);
  
    // map through each color in the colors array and set the background color to color in the object
    const miniColorBoxes = colors.map(color => 
      <div 
        className={classes.miniColor} 
        style={{backgroundColor: color.color}} 
        key={color.name}
      >
      </div>
    );

    return (
      <div className={classes.root} onClick={this.handleClick}>
          <DeleteIcon 
            className={classes.deleteIcon}
            style={{ transition: "all 0.3s ease-in-out" }}
            onClick={this.deletePalette}
          />
        {/* render mini color boxes */}
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
      </div>
    );
  }
  
}

// material-ui's "withStyles" is adding "classes" to props; "classes" will have the styles we defined above 
export default withStyles(styles)(MiniPalette);
