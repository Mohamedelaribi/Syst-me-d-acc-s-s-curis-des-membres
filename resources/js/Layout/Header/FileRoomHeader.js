import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as functions from '../../functions';
import assets from '../../assets';
import * as routes from '../../constants/routes';

const FileRoomHeader = (props) => {
  const {room} = props;

  return (
    <div className="room-header d-flex align-items-center p-1">
      <span className="mr-2">Closing Room - ID:{functions.getFormattedID(room.id, 7)}</span>
      <Link to={`/room/${room.rid}/update`} className="mr-5">
        <img src={assets.info_black} className="size-20"/>
      </Link>
      <div className="goback-link d-flex align-items-center"
        onClick={(event) => {props.history.goBack()}}
      >
        <img src={assets.arrow_left_black_circle} className="size-20 mr-2"/>
        <span>Back to <u>MainRoom</u></span>
      </div>
    </div>
  )
};

const mapStateToProps = ({ room }) => {
  return {
    room,
  }
}

export default connect(mapStateToProps)(withRouter(FileRoomHeader));
