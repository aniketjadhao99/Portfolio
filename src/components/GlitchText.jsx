import React from 'react';
import './Glitch.css';

const GlitchText = ({ text }) => {
  return (
    <div className="glitch-wrapper">
      <div className="glitch" data-text={text}>
        {text}
      </div>
    </div>
  );
};

export default GlitchText;
