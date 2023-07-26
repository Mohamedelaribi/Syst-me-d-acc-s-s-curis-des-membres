import React from 'react';

const DefaultHeader = (props) => (
  <div className="page-header d-flex justify-content-center align-items-center">
    <div className="title">
      {props.title}
    </div>
  </div>
);

export default DefaultHeader;
