import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

function ColorBox(props) {
  const { color, name } = props;

  return (
    <CopyToClipboard text={ color }>
      <div style={{ background: color }} className="ColorBox">
        <div className="ColorBox-copy-container">
          <div className="ColorBox-box-content">
            <span>{name}</span>
          </div>
          <button className="ColorBox-copy-button">Copy</button>
        </div>
        <span className="ColorBox-more">MORE</span>
      </div>
    </CopyToClipboard>
    
  );
}

export default ColorBox;