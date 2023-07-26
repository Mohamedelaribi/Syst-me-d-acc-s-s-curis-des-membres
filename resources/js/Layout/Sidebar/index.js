import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as actions from '../../actions';
import * as functions from '../../functions';

import SidebarNavItem from './SidebarNavItem';
import KYCApprovalsItem from './KYCApprovalsItem';

const Sidebar = (props) => {
  const renderHeader = () => (
    <div className="sidebar-header mb-5">
      <div className="d-flex justify-content-center">
        <div className="logo-image mr-2">
          <img src={assets.logo_blue}/>
        </div>
        <div className="logo-text align-self-end">
          <div className="title">
            MNM
          </div>
          <div className="subtitle">
            ClosingRoom
          </div>
          <div className="version">
            Beta
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="sidebar d-flex flex-column align-items-center p-4">
      {renderHeader()}
      <UserSidebar/>
      <AdminSidebar {...props}/>
      <div className="about-block">
        <SidebarNavItem to="" text="What is a ClosingRoom?"/>
      </div>
      <div className="signout-block mt-auto">
        <button type="button" className="button-transparent"
          onClick={functions.doLogout}
        >
          <img src={assets.logout_red} className="size-20 mr-2"/>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}


const UserSidebar = () => (
  <div className="align-self-start">
    <SidebarNavItem to={routes.DASHBOARD} asset={assets.home} text="Home"/>
    <SidebarNavItem to={routes.ACCOUNT_SETTINGS} asset={assets.setting_blue} text="Account Settings"/>
    <SidebarNavItem to={routes.MY_ROOMS} asset={assets.find} text="My Rooms"/>
  </div>
);


class AdminSidebar extends Component {

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { authUser, user, fetchUser } = props
    if (!authUser || !authUser.uid) {
      return
    }
    if (!user) {
      fetchUser(authUser.uid);
      return
    }
  }

  render() {
    const { user } = this.props

    return (user && (functions.isAdmin(user.level) || functions.isModerator(user.level)) &&
      <div className="align-self-start">
        <SidebarNavItem to={routes.ROOMS} asset={assets.manage_rooms} text="ManageRooms"/>
        <SidebarNavItem to={routes.MANAGE_ACCOUNTS} asset={assets.accounts_black} text="Manage Accounts"/>
        <KYCApprovalsItem color="black"/>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, user }) => {
  return {
    authUser,
    user,
  }
}

export default connect(mapStateToProps, actions)(Sidebar);
