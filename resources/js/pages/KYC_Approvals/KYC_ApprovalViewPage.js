import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import DefaultHeader from '../../Layout/Header/DefaultHeader';
import PaneHeader from '../../Layout/Header/PaneHeader';

import DocumentLinkForm from '../Files/FileManager/FileLinkForms/DocumentLinkForm';

import * as actions from '../../actions';

import _ from 'lodash';


const INITIAL_STATE = {
  reason: '',
}

class KYC_ApprovalViewPage extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { users } = props
    if (!users) {
      return
    }
  }

  renderUserInfo = () => {
    const { users } = this.props;
    const { uid } = this.props.match.params
    let user = users[uid]

    return (
      <div className="userinfo-block flex-grow-1 p-3">
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">User ID:</div>
          <div>{functions.getFormattedID(user.id, 7)}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">First Name:</div>
          <div>{user.firstname}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">Last Name:</div>
          <div>{user.lastname}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">Occupation:</div>
          <div>{user.occupation}</div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">Passport Number:</div>
          <div className="d-flex justify-content-start">
            <span className="mr-5">{user.passport}</span>
            <DocumentLinkForm type="passport" url={user.passport_url} download={false}>
              <b><u>View passport scan</u></b>
            </DocumentLinkForm>
          </div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">Address:</div>
          <div className="d-flex justify-content-start">
            <span className="mr-5">{user.address}</span>
            <DocumentLinkForm type="passport" url={user.address_url} download={false}>
              <b><u>View proof of address scan</u></b>
            </DocumentLinkForm>
          </div>
        </div>
        <div className="d-flex flex-row my-3">
          <div className="font-weight-bold w-25">Country:</div>
          <div>{user.location}</div>
        </div>
      </div>
    )
  }

  onApproveKYC = () => {
    const { history } = this.props
    const { uid } = this.props.match.params
    db.doApproveKYC(uid)
    history.push(routes.KYC_APPROVALS)
  }

  onDenyKYC = () => {
    const { history } = this.props
    const { uid } = this.props.match.params
    const { reason } = this.state
    db.doDenyKYC(uid, reason)
    history.push(routes.KYC_APPROVALS)
  }

  renderActions = () => {
    const {reason} = this.state
    return (
      <div className="action-block mt-auto d-flex justify-content-center align-items-center">
        <div className="approve-block mr-5">
          <button className="button button-md button-green"
            onClick={(event) => this.onApproveKYC()}
          >
            Approve
            <img src={assets.agree_white} className="size-20 ml-2"/>
          </button>
        </div>
        <div className="deny-block">
          <div className="header px-2">
            Deny User
          </div>
          <div className="body p-2">
            <div className="font-weight-bold">Reason:</div>
            <textarea
              name="reason"
              id="reason"
              value={reason}
              onChange={(event) => {
                this.setState({reason: event.target.value})
              }}
              rows="3"
              className="w-100"
            />
            <div className="w-100 text-center">
              <button className="button button-md button-red mr-2"
                onClick={(event) => this.onDenyKYC()}
              >
                Deny
                <img src={assets.disagree_white} className="size-20 ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { users } = this.props;

    if (!users) {
      return <div></div>
    }

    return (
      <div className="kyc-approval-view-page d-flex flex-column h-100">
        <DefaultHeader title="KYC Approvals -> View" />
        <div className="page-content flex-grow-1 d-flex flex-column pb-4">
          <PaneHeader back={true}/>
          {this.renderUserInfo()}
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps, actions)(KYC_ApprovalViewPage));
