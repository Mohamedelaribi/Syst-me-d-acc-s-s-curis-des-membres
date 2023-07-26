import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import DefaultHeader from '../../Layout/Header/DefaultHeader';

import * as actions from '../../actions';

import _ from 'lodash';

const INITIAL_STATE = {
  rooms: null,
  search: '',
};

class MyRoomsPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { authUser, rooms } = props
    if (!rooms) {
      return
    }

    var user_rooms = {}

    Object.keys(rooms).map(key => {
      const room = rooms[key]
      room.rid = key
      if (room.users) {
        let user = null
        Object.keys(room.users).map(key => {
          if (key === authUser.uid) {
            user = room.users[key]
            user.uid = key
          }
        })
        if (user != null) {
          room.user = user
          user_rooms[key] = room
        }
      }
    })

    this.setState({rooms: user_rooms})
  }

  render() {
    const { rooms, search } = this.state;

    if (!rooms) {
      return <div></div>
    }

    return (
      <div className="rooms-page d-flex flex-column">
        <div className="page-content flex-grow-1">
          <div className="header d-flex justify-content-center align-items-center">
            <span className="title mr-5">My ClosingRooms</span>
            <input type="text" className="px-1"
              value={search}
              autoFocus
              onChange = { (event) => { this.setState({search: event.target.value}) }}
              placeholder="Search.."
            />
          </div>
          <table className="table mytable rooms text-center">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Nickname</th>
                <th>Room Level</th>
                <th>Participants</th>
                <th>Creation Date</th>
                <th>Expiration Date</th>
                <th></th>
              </tr>
            </thead>
            { !!rooms &&
              <tbody>
                {Object.keys(rooms).map(key => {
                  let room = rooms[key]
                  if (functions.getFormattedID(room.id, 7).toString().toLowerCase().includes(search.toLowerCase()) || String(room.user.roomname||'').toString().toLowerCase().includes(search.toLowerCase())) {
                    return <RoomRow key={key} room={room}/>
                  }
                })}
              </tbody>
            }
          </table>
          <div className="d-flex justify-content-center">
            <Link to={routes.CREATE_ROOM}>
              <button className="button button-md button-white d-flex align-items-center px-2 py-1 rounded shadow">
                Create a ClosingRoom
                <img src={assets.plus_blue} className="size-15 ml-2"/>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

class RoomRow extends Component {
  state = {
    room: null,
    isEditingNickname: false,
  }

  componentDidMount() {
    this.init(this.props)
  }

  init = (props) => {
    const { room } = props
    this.setState({
      room: room,
      isEditingNickname: false,
    })
  }

  onEditNickname = () => {
    this.setState({
      isEditingNickname: true,
    })
  }

  onEnterNickname = () => {
    const { room } = this.state
    db.doChangeRoomname(room.rid, room.user.uid, room.user.roomname)

    this.setState({
      isEditingNickname: false,
    })
  }

  render() {
    const { room, isEditingNickname } = this.state

    if (!(!!room)) {
      return <tr></tr>
    }

    return (
      <tr>
        <td>{functions.getFormattedID(room.id, 7)}</td>
        <td className="nickname">
          { isEditingNickname ?
            <input
              type="text"
              className="text-center"
              placeholder="enter nickname"
              value={room.user.roomname}
              autoFocus
              onChange = { (event) => {
                let room = this.state.room;
                room.user.roomname = event.target.value;
                this.setState({room: room});
              }}
              onKeyPress={(event) => {
                if (event.keyCode == 13 || event.charCode == 13) {
                  this.onEnterNickname()
                }
              }}
              onBlur={this.onEnterNickname}
            />
          :
            <span onClick={(event) => this.onEditNickname()} className={`${room.user.roomname==''?'color-disabled':''}`}>
              { room.user.roomname || 'enter nickname'}
            </span>
          }
        </td>
        <td>{room.level}</td>
        <td>{_.size(room.users)}</td>
        <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
        <td>{functions.getFormattedDate(new Date(room.expire_date))}</td>
        <td>
          <Link to={`/rooms/${room.rid}`}>
            <button className="button button-md button-white d-flex align-items-center px-2 rounded shadow">
              <span className="mr-2">Enter</span>
              <img src={assets.angle_right_blue} className="size-15"/>
            </button>
          </Link>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({ authUser, rooms }) => {
  return {
    authUser,
    rooms,
  }
}

export default withRouter(connect(mapStateToProps, actions)(MyRoomsPage));
