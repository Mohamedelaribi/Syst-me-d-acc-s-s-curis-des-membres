
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../firebase';

import assets from '../../assets';
import * as actions from '../../actions';

import * as functions from '../../functions';

import ROLES from '../../constants/roles';

import _ from 'lodash';

const INITIAL_STATE = {
  invites: [
    { email: '', role: 1, admin: false, },
    { email: '', role: 1, admin: false, },
    { email: '', role: 1, admin: false, },
    { email: '', role: 1, admin: false, },
    { email: '', role: 1, admin: false, }
  ]
}

class AddUsersModal extends Component {
  state = { invites: _.map(INITIAL_STATE.invites, (s) => {return _.clone(s)}) };

  onChange = (event, index) => {
    let value = event.target.value
    if (event.target.name == 'admin') {
      value = event.target.checked
    }
    let invites = this.state.invites
    invites[index][event.target.name] = value
    this.setState(invites);
  }

  onInviteUsers = event => {
    event.preventDefault()

    const { room, user, users } = this.props
    const { invites } = this.state

    _.forEach(invites, (invite, index) => {
      if (invite.email) {
        functions.doSendInviteEmail(room, user, invite, users)
      }
    })

    setTimeout(() => {
      alert('Invitation emails sent successfully')
      this.closeDialog()
    }, 1000);
  }

  onReset = () => {
    this.setState({invites: _.map(INITIAL_STATE.invites, (s) => {return _.clone(s)})});
  }

  closeDialog = () => {
    this.onReset()
    $('.modal-background').addClass('d-none')
    $('.adduser-modal').addClass('d-none')
  }

  renderInviteUser = (index) => {
    const { email, role, admin } = this.state.invites[index]
    const email_label = `email${index}`
    const role_label = `role${index}`
    return (
      <div key={index} className="row">
        <div className="col-4">
          <label htmlFor={email_label}>Email:</label>
          <input
            name="email"
            id={email_label}
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => {this.onChange(event, index)}}
          />
        </div>
        <div className="col-4">
          <label htmlFor={role_label}>Role:</label>
          <select
            name="role"
            id={role_label}
            value={role}
            onChange={(event) => {this.onChange(event, index)}}
            className="form-control"
          >
            {_.map(ROLES, (role, key) => (
              <option key={key} value={role.index}>{role.label}</option>
            ))}
          </select>
        </div>
        <div className="col-4">
          { index == 0 ?
            <label className="d-block text-center">ClosingRoom Admin:</label>
          :
            <label></label>
          }
          <input
            name="admin"
            type="checkbox"
            className="form-control"
            value={admin}
            onChange={(event) => {this.onChange(event, index)}}
          />
        </div>
      </div>
    )
  }

  renderInviteUsers = () => {
    return _.times(5, (index) => this.renderInviteUser(index))
  }

  render() {
    return (
      <div className="adduser-modal mymodal d-none" onSubmit={this.onInviteUsers}>
        <form className="form-group">
          <div className="header d-flex justify-content-between align-items-center">
            <img src={assets.logo_transparent} className="size-40"/>
            <div className="d-flex align-items-center">
              <span className="title text-white mr-3">Add Users to ClosingRoom</span>
            </div>
            <div
              className="close"
              onClick={this.closeDialog}
            >
              <img src={assets.close} className="size-30"/>
            </div>
          </div>
          <div className="body p-4">
            <div className="font-weight-bold mb-1">Invite new users by email</div>
            <div className="mb-5">
              {this.renderInviteUsers()}
            </div>
            <div className="text-center">
              <button type="submit" className="button button-md button-white">
                Invite User(s)
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ room, user, users }) => {
  return {
    room,
    user,
    users,
  }
}

export default connect(mapStateToProps, actions)(AddUsersModal);
