import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserAuth from './UserAuth';

import * as routes from '../constants/routes';
import * as functions from '../functions';

export default function(ComposedComponent) {
  class AdminAuth extends Component {
    componentWillMount() {
      const {user, history} = this.props
      if (user && functions.isNormalUser(user.level)) {
        history.push(routes.DASHBOARD);
        return
      }
    }

    componentWillUpdate(nextProps) {
      const {history} = this.props
      const {user} = nextProps
      if (user && functions.isNormalUser(user.level)) {
        history.push(routes.DASHBOARD);
        return
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ user }) => {
    return {
      user,
    }
  }

  return withRouter(connect(mapStateToProps)(UserAuth(AdminAuth)));
}
