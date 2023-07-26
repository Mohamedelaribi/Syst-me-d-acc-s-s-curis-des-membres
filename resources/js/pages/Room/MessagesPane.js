import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { db } from '../../firebase';

import { getFormattedDate, getFormattedTime } from '../../functions';
import assets from '../../assets';

const INITIAL_STATE = {
  message: '',
}

class MessagesPane extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const {msg_block} = this.refs;
    msg_block.scrollTop = msg_block.scrollHeight - msg_block.clientHeight;
  }

  handleSendMessage = () => {
    const { authUser, room, receiver_uid } = this.props;
    const {message} = this.state;
    if (message) {
      db.doCreateMessage(room.rid, authUser.uid, receiver_uid, message)
      this.setState({ ...INITIAL_STATE });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.keyCode == 13 || event.charCode == 13) {
      event.preventDefault();

      this.handleSendMessage();
    }
  }

  renderMessage = (key, message) => (
    <div key={key} className="message-block mb-3">
      <div className="content p-2 mr-2">
        {message.content}
      </div>
      <div className="timestamp align-self-end">
        <span className="time mr-1">{getFormattedTime(new Date(message.date), true)}</span>
        <span className="date">{getFormattedDate(new Date(message.date))}</span>
      </div>
    </div>
  )

  renderMessages = () => {
    const { authUser, room, users, receiver_uid } = this.props;
    const { messages } = room;

    var sender_uid = null
    return _.map(messages, (message, key) => {
      if (!users[message.sender_uid]) {
        return
      }
      if (message.receiver_uid == receiver_uid) {
        const isFirst = (sender_uid == null)
        if (message.sender_uid != sender_uid) {
          sender_uid = message.sender_uid
          return [
            <div key={`${message.sender_uid}-${key}`} className="mt-4">{users[message.sender_uid].displayname}</div>,
            this.renderMessage(key, message)
          ]
        } else {
          return this.renderMessage(key, message)
        }
      }
    })
  }

  render() {
    const { message } = this.state;

    return (
      <div className="messages-pane flex-grow-1 d-flex flex-column">
        <div className="messages-block flex-grow-1 m-4" ref={`msg_block`}>
          {this.renderMessages()}
        </div>
        <div className="send-message-block d-flex">
          <div className="new-message-block col-10 h-100 d-flex align-items-center">
            <input
              name="message"
              type="text"
              className="new-message-input w-100 border-0"
              placeholder="Type a message.."
              value={message}
              onChange={this.onChange}
              onKeyPress={(event) => this.handleKeyPress(event)}
            />
            <img src={assets.file_white} className="size-20 mr-1"/>
            <img src={assets.smile} className="size-20"/>
          </div>
          <div className="request-moderator-block col-2 h-100 d-flex align-items-center">
            <img src={assets.moderator_black} className="size-20 mr-2"/>
            <span>Request Moderator</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, room, users }) => {
  return {
    authUser,
    room,
    users,
  }
}

export default connect(mapStateToProps)(MessagesPane);
