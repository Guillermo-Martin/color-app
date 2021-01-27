import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorBox.css';

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
    const { color, name, moreUrl, showLink } = this.props;
    // getting the relative brightness of a color using chroma.js; "isDarkColor" will either be true or false based on the number of the relative brightness
    const isDarkColor = chroma(color).luminance() <= 0.08;
    const isLightColor = chroma(color).luminance() >= 0.7;

    return (
      <CopyToClipboard text={ color } onCopy={this.changeCopyState}>
        <div style={{ background: color }} className="ColorBox">
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
            <p className={isLightColor && "ColorBox-dark-text"}>{color}</p>
          </div>

          <div className="ColorBox-copy-container">
            <div className="ColorBox-box-content">
              <span className={isDarkColor && "ColorBox-light-text"}>{name}</span>
            </div>
            <button className={`ColorBox-copy-button ${isLightColor && "ColorBox-dark-text"}`}>Copy</button>
          </div>
          {/* "stopPropagation()"" prevents further events from being called further up the line */}
          {/* this will keep the overlay animation from the parent from firing */}
          {showLink && (
            <Link 
            to={moreUrl} 
            onClick={event => event.stopPropagation()}
            >
              <span className={`ColorBox-more ${isLightColor && "ColorBox-dark-text"}`}>MORE</span>
            </Link>
          )}
          
          
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;