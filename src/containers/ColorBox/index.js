import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './../../assets/styles/ColorBoxStyles.js';
import { withStyles } from '@material-ui/styles';


class ColorBox extends Component {
  state = {
    copied: false,
  }

  // function to change "copied" state.  this will be used for displaying the overlay
  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      // after chaging "copied" to true, change "copied" back to "false" after 1.5 sec
      setTimeout(() => this.setState({ copied: false }), 1500)
    })
  }

  render() {
    // destructure color and name from props
    const { color, name, moreUrl, showingFullPalette, classes } = this.props;
    
    return (
      <CopyToClipboard text={ color } onCopy={this.changeCopyState}>
        <div style={{ background: color }} className={classes.ColorBox}>
          {/* Overlay to grow */}
          {/* When you click to copy, display the overlay and have it grow */}
          {/* for className: if 'this.state.copied' is true, add 'show' to the className */}
          <div 
            style={{ background: color }} 
            className={`${classes.copyOverlay} ${this.state.copied && classes.showOverlay}`}>
          </div>

          {/* Message in the overlay */}
          {/* When you click to copy, display the "copied" message */}
          <div className={`${classes.copyMessage} ${this.state.copied && classes.showMessage}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{color}</p>
          </div>

          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {/* "stopPropagation()"" prevents further events from being called further up the line */}
          {/* this will keep the overlay animation from the parent from firing */}
          {showingFullPalette && (
            <Link 
            to={moreUrl} 
            onClick={event => event.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
          
          
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);