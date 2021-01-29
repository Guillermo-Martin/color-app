import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
  ColorBox: {
    width: "20%",
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    }
  },
  copyText: {
    // write a function to dynamically change colors; styles automatically has access to props
    // this is one class that has styles that are dynamically generated
    color: props => chroma(props.color).luminance() >= 0.7 ? "black" : "white",
  },
  colorName: {
    color: props => chroma(props.color).luminance() <= 0.08 ? "white" : "black",
  },
  seeMore: {
    color: props => chroma(props.color).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    border: "none",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: props => chroma(props.color).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    border: "none",
    textDecoration: "none",
    opacity: 0,
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    /* we want the "transform" property (listed below) to transition */
    transition: "transform 0.6s ease-in-out",
    /* get box to start off very small */
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    /* the scale is based off of the width and height in the overlay */
    /* when activated, the width and height of the overlay will be 50 times its original size */
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    /* flex-direction: column will put the elements in a column */
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    /* delay the showing of the message */
    transitionDelay: "0.3s",
  }
}


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