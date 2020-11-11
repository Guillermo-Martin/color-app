import React from 'react';
import './ColorBox.css';

function ColorBox(props) {
  return (
    <div style={{ backgroundColor: props.color }} className="ColorBox">
      <span>{props.name}</span>
      <span>MORE</span>
      
    </div>
  );
}

export default ColorBox;
