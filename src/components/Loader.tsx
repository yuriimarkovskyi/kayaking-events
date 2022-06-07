import React from 'react';

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <div className="loader__line-wrapper">
        <div className="loader__line loader__line_1" />
        <div className="loader__line loader__line_2" />
        <div className="loader__line loader__line_3" />
        <div className="loader__line loader__line_4" />
      </div>
    </div>
  );
}

export default Loader;
