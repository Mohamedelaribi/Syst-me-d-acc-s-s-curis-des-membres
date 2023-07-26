import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import assets from '../../assets';

import ROLES from '../../constants/roles';

import * as actions from '../../actions';

import * as functions from '../../functions';

import PaneHeader from '../../Layout/Header/PaneHeader';
import RANKS from '../../constants/ranks';

const INITIAL_STATE = {
  expanded1: true,
  expanded2: true,
  expanded3: true,
  expanded4: true,
}

class UserListPane extends Component {
  state = { ...INITIAL_STATE };

  renderBuyerSellTeam = () => {
    const { room, users } = this.props
    const { expanded1 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Buy/Sell Team</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded1: !expanded1})}}
          >
            <img className="size-20" src={expanded1?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
        </div>
        <div className="group-content">
        {expanded1 &&
          Object.keys(users).map(key => {
            if (room.users[key]) {
              let user = {...users[key], ...room.users[key]}
              if ((ROLES.BUYER.index <= user.role && user.role <= ROLES.SELLER_MANDATE.index) && functions.isNormalUser(user.level)) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderIntermediaries = () => {
    const { room, users } = this.props
    const { expanded2 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Intermediaries</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded2: !expanded2})}}
          >
            <img className="size-20" src={expanded2?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
        </div>
        <div className="group-content">
        {expanded2 &&
          Object.keys(users).map(key => {
            if (room.users[key]) {
              let user = {...users[key], ...room.users[key]}
              if ((ROLES.BUYER_INTERMEDIARY.index <= user.role && user.role <= ROLES.SELLER_INTERMEDIARY.index) && functions.isNormalUser(user.level)) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderProfessionals = () => {
    const { room, users } = this.props
    const { expanded3 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Professionals</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded3: !expanded3})}}
          >
            <img className="size-20" src={expanded3?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
        </div>
        <div className="group-content">
        {expanded3 &&
          Object.keys(users).map(key => {
            if (room.users[key]) {
              let user = {...users[key], ...room.users[key]}
              if ((ROLES.ESCROW_AGENT.index <= user.role && user.role <= ROLES.LAWYER.index) && functions.isNormalUser(user.level)) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }
  renderModeratorsGlobalAdmins = () => {
    const { room, users } = this.props
    const { expanded4 } = this.state

    return (
      <div className="group">
        <div className="group-header d-flex justify-content-between align-items-center p-1">
          <span className="group-title">Moderators/Global Admins</span>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded4: !expanded4})}}
          >
            <img className="size-20" src={expanded4?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
        </div>
        <div className="group-content">
        {expanded4 &&
          Object.keys(users).map(key => {
            if (room.users[key]) {
              let user = {...users[key], ...room.users[key]}
              if (functions.isAdmin(user.level) || functions.isModerator(user.level)) {
                return <UserRow key={key} user={user}/>
              }
            }
          })
        }
        </div>
      </div>
    )
  }

  renderParticipants = () => (
    <div className="participants-block mb-5">
      {this.renderBuyerSellTeam()}
      {this.renderIntermediaries()}
      {this.renderProfessionals()}
      {this.renderModeratorsGlobalAdmins()}
    </div>
  )

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  openAddUserModal = () => {
    $('.modal-background').removeClass('d-none')
    $('.adduser-modal').removeClass('d-none')
  }

  render() {
    return (
      <div className="userlist-pane d-flex flex-column">
        <PaneHeader title="Participants"/>
        {this.renderParticipants()}
        <div className="d-flex justify-content-center  mt-auto mb-3">
          <button className="button-white button-md d-flex align-items-center px-2 py-1 rounded shadow"
            onClick={(event) => {this.openAddUserModal()}}
          >
            <span className="mr-2">Add Users</span>
            <img src={assets.plus_blue} className="size-15"/>
          </button>
        </div>
      </div>
    )
  }
}

const UserRow = ({user}) => {
  let border = ''
  if (functions.isAdmin(user.level) || functions.isModerator(user.level)) {
    border = 'user-global-admin-border'
  } else if (user.rank === RANKS.ADMIN.index) {
    border = 'user-room-admin-border'
  }
  return (
    <div className={`user-block mb-2 p-1 ${border}`}>
      <div className="profile d-flex justify-content-between">
        <div className="">
          <span className="mr-1">{user.displayname}</span>
          {user.rank === 1 &&
            <img src={assets.star} className="size-15 mr-1"/>
          }
          <span className="mr-1">KYC</span>
          {functions.isVerified(user.level) ?
            <img src={assets.kyc_approved} className="size-15"/>
          :
            <img src={assets.kyc_disapproved} className="size-15"/>
          }
        </div>
        <div className="">
          <span>{user.timezone}</span>
          <span>[{user.time}]</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="">
        {functions.isAdmin(user.level) || functions.isModerator(user.level) ?
          [
            <span key="label" className="mr-1">Moderator</span>,
            <img key="image" src={assets.moderator_black} className="size-15"/>
          ]
        :
          [
            <span key="label">{_.find(ROLES, _.matchesProperty('index', user.role)).label}</span>,
            (user.rank === RANKS.PROFESSIONAL.index &&
              <img key="image" src={assets.secure_transparent} className="size-15"/>
            )
          ]
        }
        </div>
        <div className="">
          <img src={assets.setting_black} className="size-15 mr-2"/>
          {user.attendance == 1 ?
            <img src={assets.online} className="size-15"/>
          :
            <img src={assets.offline} className="size-15"/>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ authUser, room, users }) => {
  return {
    authUser,
    room,
    users,
  }
}

export default connect(mapStateToProps, actions)(UserListPane);
