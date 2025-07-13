import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="ai-loader-wrapper">
      <div className="ai-loader-orbs">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`orb orb-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default Loader;
