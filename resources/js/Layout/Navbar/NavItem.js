import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as functions from '../../functions';

const NavItem = (props) => {
  if (props.nav_admin == true && !(props.user && functions.isAdmin(props.user.level))) {
    return <div></div>
  }
  return (
    <Link to={props.to} className="navitem d-flex align-items-center mx-3">
      { props.asset &&
        <div className="navitem-image">
          <img src={props.asset} className={`size-${props.size}`}/>
        </div>
      }
      { props.text &&
        <span className="navitem-text p-1">
          {props.text}
        </span>
      }
    </Link>
  )
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  }
}

export default withRouter(connect(mapStateToProps)(NavItem));
