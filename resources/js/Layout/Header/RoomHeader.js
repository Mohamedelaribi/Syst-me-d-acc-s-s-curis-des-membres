import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as functions from '../../functions';
import assets from '../../assets';
import * as routes from '../../constants/routes';

const RoomHeader = (props) => {
  const {room} = props;

  return (
    <div className="room-header d-flex align-items-center p-1">
      <span className="mr-2">Closing Room - ID:{functions.getFormattedID(room.id, 7)}</span>
      <Link to={`/room/${room.rid}/update`}>
        <img src={assets.info_black} className="size-20"/>
      </Link>
    </div>
  )
};

const mapStateToProps = ({ room }) => {
  return {
    room,
  }
}

export default connect(mapStateToProps)(RoomHeader);
