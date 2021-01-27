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
            className={`ColorBox-copy-overlay ${this.state.copied && "show"}`}>
          </div>

          {/* Message in the overlay */}
          {/* When you click to copy, display the "copied" message */}
          <div className={`ColorBox-copy-message ${this.state.copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{color}</p>
          </div>

          <div className="ColorBox-copy-container">
            <div className="ColorBox-box-content">
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