import React from 'react';
import './ColorBox.css';

function ColorBox(props) {
  const { color, name } = props;

  return (
    <div style={{ background: color }} className="ColorBox">
      <div className="ColorBox-copy-container">
        <div className="ColorBox-box-content">
          <span>{name}</span>
        </div>
        <button className="ColorBox-copy-button">Copy</button>
      </div>
      <span className="ColorBox-more">MORE</span>
    </div>
  );
}

export default ColorBox;
