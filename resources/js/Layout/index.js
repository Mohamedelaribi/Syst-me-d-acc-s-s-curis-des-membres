import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { connect } from 'react-redux';

// layout
// import Sidebar from './Sidebar';
import Navbar from './Navbar';
import HomeNavbar from './Navbar/HomeNavbar';
import MyModal from './Modal';
import HomeFooter from './Footer/HomeFooter';

// pages
import HomePage from '../pages/Home';
// user
import DashboardPage from '../pages/Dashboard';
import VerifyPage from '../pages/Verify';
import SignInPage from '../pages/Sign/SignIn';
import SignUpPage from '../pages/Sign/SignUp';
import AccountPage from '../pages/Account';
import KYCPage from '../pages/Account/KYCPage';
import MyRoomsPage from '../pages/MyRooms';
import CreateRoomPage from '../pages/CreateRoom';
import UpdateRoomPage from '../pages/UpdateRoom';
import RoomPage from '../pages/Room';
import RoomFilesPage from '../pages/Files';
// admin
import RoomsPage from '../pages/Rooms';
import AccountsPage from '../pages/Accounts';
import KYC_ApprovalsPage from '../pages/KYC_Approvals';
import KYC_ApprovalViewPage from '../pages/KYC_Approvals/KYC_ApprovalViewPage';

// components
import * as routes from '../constants/routes';
import * as actions from '../actions';

import UserAuth from '../Auth/UserAuth';
import AdminAuth from '../Auth/AdminAuth';

const DefaultLayout = ({component: Component, ...rest}) => {
  window.scrollTo(0,0);
  return (
    <Route {...rest} render={matchProps => (
      <div className="layout d-flex flex-column">
        <Navbar/>
        <div className="main-content flex-grow-1">
          <Component {...matchProps} />
        </div>
      </div>
    )} />
  )
};

const HomeLayout = ({component: Component, ...rest}) => {
  window.scrollTo(0,0);
  return (
    <Route {...rest} render={matchProps => (
      <div className="layout d-flex flex-column">
        <HomeNavbar/>
        <div className="main-content flex-grow-1">
          <Component {...matchProps} />
        </div>
        <HomeFooter/>
      </div>
    )} />
  )
};

const SignLayout = ({component: Component, ...rest}) => {
  window.scrollTo(0,0);
  return (
    <Route {...rest} render={matchProps => (
      <Component {...matchProps} />
    )} />
  )
};


class Layout extends Component {
  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchAuthUser();
    this.props.fetchDocuments();
    this.props.fetchRooms();
  }

  render() {
    return (
      <Router>
        <div>

          <HomeLayout exact path={routes.HOME} component={HomePage} />

          <SignLayout exact path={routes.SIGN_IN} component={SignInPage} />
          <SignLayout exact path={routes.SIGN_UP} component={SignUpPage} />

          <DefaultLayout exact path={routes.VERIFY_EMAIL} component={UserAuth(VerifyPage)} />
          <DefaultLayout exact path={routes.DASHBOARD} component={UserAuth(DashboardPage)} />
          <DefaultLayout exact path={routes.ACCOUNT_SETTINGS} component={UserAuth(AccountPage)} />
          <DefaultLayout exact path={routes.KYC} component={UserAuth(KYCPage)} />
          <DefaultLayout exact path={routes.MY_ROOMS} component={UserAuth(MyRoomsPage)} />
          <DefaultLayout exact path={routes.ROOM} component={UserAuth(RoomPage)} />
          <DefaultLayout exact path={routes.CREATE_ROOM} component={UserAuth(CreateRoomPage)} />
          <DefaultLayout exact path={routes.ROOM_FILES} component={UserAuth(RoomFilesPage)} />
          <DefaultLayout exact path={routes.UPDATE_ROOM} component={UserAuth(UpdateRoomPage)} />

          <DefaultLayout exact path={routes.ROOMS} component={AdminAuth(RoomsPage)} />
          <DefaultLayout exact path={routes.MANAGE_ACCOUNTS} component={AdminAuth(AccountsPage)} />
          <DefaultLayout exact path={routes.KYC_APPROVALS} component={AdminAuth(KYC_ApprovalsPage)} />
          <DefaultLayout exact path={routes.KYC_APPROVAL} component={AdminAuth(KYC_ApprovalViewPage)} />

          <MyModal/>

        </div>
      </Router>
    )
  }
}

export default connect(null, actions)(Layout);
