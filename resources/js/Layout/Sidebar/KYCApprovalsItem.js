import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import assets from '../../assets';
import * as routes from '../../constants/routes';

import * as actions from '../../actions';

import _ from 'lodash';

class KYCApprovalsItem extends Component {
  renderNewKYCs = () => {
    const { users } = this.props
    let newKYCcount = 0

    if (users) {
      _.forEach(users, function(user, key){
        if (user.kyc_status === 'pending') {
          newKYCcount ++
        }
      })
    }
    if (newKYCcount > 0) {
      return (
        <div className="new-kycs d-flex justify-content-center align-items-center">
          {newKYCcount}
        </div>
      )
    }
  }
  render() {
    const {color} = this.props

    return (
      <Link to={routes.KYC_APPROVALS} className="kyc-approval-link-block py-2 d-flex">
        { color === 'white' ?
          <div className="mr-3">
            <img src={assets.search_white} className="size-20"/>
          </div>
        :
          <div className="mr-3">
            <img src={assets.search_black} className="size-20"/>
          </div>
        }
        <span className={`align-self-center ${color==='white'?'text-white':''}`}>KYC Approvals</span>
        {this.renderNewKYCs()}
      </Link>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  }
}

export default connect(mapStateToProps, actions)(KYCApprovalsItem);
