import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../firebase'

import * as actions from "../../actions";

import RoomHeader from '../../Layout/Header/RoomHeader';

import UserListPane from './UserListPane';
import MessagesPane from './MessagesPane';
import TasksPane from './TasksPane';

const INITIAL_STATE = {
  receiver_uid: null,
}

class RoomPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { rid } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(rid);
  }

  handleSelectReceiver = (receiver_uid) => {
    if (this.state.receiver_uid === receiver_uid) {
      receiver_uid = null;
    }
    // this.setState({
    //   receiver_uid,
    // })
  }

  render() {
    const { room, user } = this.props
    const { receiver_uid } = this.state

    if (!room || !user) {
      return <div></div>
    }
    return (
      <div className="room-page d-flex flex-column h-100">
        <RoomHeader/>
        <div className="page-content flex-grow-1 d-flex flex-row">
          <UserListPane receiver_uid={receiver_uid} handleSelectReceiver={this.handleSelectReceiver}/>
          <MessagesPane receiver_uid={receiver_uid}/>
          <TasksPane/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, user, users, room }) => {
  return {
    authUser,
    user,
    users,
    room,
  }
}

export default withRouter(connect(mapStateToProps, actions)(RoomPage));
