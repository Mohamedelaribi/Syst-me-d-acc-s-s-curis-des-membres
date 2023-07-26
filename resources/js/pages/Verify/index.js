import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import * as functions from '../../functions';


class VerifyPage extends Component {
  componentWillReceiveProps(nextProps) {
    const { uid } = this.props.match.params
    const { authUser } = nextProps
    const { history } = this.props

    if ( uid == authUser.uid ) {
      db.doEmailVerifyUser(uid)
      history.push(routes.DASHBOARD);
    }
  }
  render() {
    return <div></div>
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  }
}

export default withRouter(connect(mapStateToProps, null)(VerifyPage));
