import React from 'react';
import assets from '../../assets';
import { withRouter } from 'react-router-dom';

const PaneHeader = (props) => (
  <div className="pane-header px-3">
  {props.back ?
    <div className="row">
      <div className="col-4">
        <div className="goback-link d-flex align-items-center"
          onClick={(event) => {props.history.goBack()}}
        >
          <img src={assets.arrow_left_white_circle} className="size-20 mr-2"/>
          <span>Back</span>
        </div>
      </div>
      <div className="col-4">
        <div className="title text-center">
          {props.title}
        </div>
      </div>
    </div>
  :
    <div className="title text-center">
      {props.title}
    </div>
  }
  </div>
);

export default withRouter(PaneHeader);
