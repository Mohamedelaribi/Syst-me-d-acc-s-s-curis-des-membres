import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import assets from '../../assets';
import * as routes from '../../constants/routes';

import NavItem from './NavItem';

const HomeNavbar = (props) => {
  return (
    <div className="navbar">
      <div className="logo-block d-flex justify-content-start align-items-center">
        <div className="logo-image mr-2">
          <img src={assets.logo_transparent} className="size-30"/>
        </div>
        <div className="logo-text">
          <div className="title font-weight-bold text-white">MNM</div>
          <div className="subtitle text-white">ClosingRoom</div>
        </div>
      </div>
      <div className="help-block d-flex">
        <Link to={routes.SIGN_IN} className="mr-2">
          <button className="button-outline">Login</button>
        </Link>
        <Link to={routes.SIGN_UP} className="mr-5">
          <button className="button-outline">Register</button>
        </Link>
        <NavItem to="" asset={assets.help_white} text=""/>
      </div>
    </div>
  )
}

export default HomeNavbar;
