import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PasswordChangeForm from './PasswordChangeForm';
import DefaultHeader from '../../Layout/Header/DefaultHeader';

import * as actions from '../../actions';
import assets from '../../assets';

import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';

import { getFormattedID } from '../../functions';

const AccountPage = () => (
  <div className="account-page mt-5 pt-5 container d-flex flex-column">
    <div className="page-content flex-grow-1 m-3 p-3">
      <Connected_ProfileChangeForm/>
    </div>
  </div>
);


const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  displayname: '',
  email: '',
  level: 0,
  error: null,
};

class ProfileChangeForm extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.state
    if (!id || nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { authUser, user } = props
    const { fetchUser } = props
    if (!authUser || !authUser.uid || !user) {
      return
    }
    this.setState(user)
  }

  onSubmit = event => {
    event.preventDefault();

    const { authUser } = this.props;
    const { firstname, lastname, displayname, email } = this.state;

    auth
      .doEmailUpdate(email)
      .then(() => {
        db.doUserProfileUpdate(authUser.uid, email, firstname, lastname, displayname)
        alert('Account updated successfully')
      })
      .catch(error => {
        alert(error)
        this.setState({ error });
      });

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderKYCApproval = () => {
    const { level, kyc_status, kyc_deny_reason } = this.state
    let kyc_style = ''
    let kyc_string = ''
    let start_kyc = false
    let warning = false
    if (level == 0) {
      if (kyc_status === 'pending') {
        kyc_style = 'pending'
        kyc_string = 'Level0 (KYC Pending Approval)'
      } else if (kyc_status === 'failed') {
        kyc_style = 'unverified'
        kyc_string = 'Level0 (Unverified)'
        warning = true
      } else {
        kyc_style = 'unverified'
        kyc_string = 'Level0 (Unverified)'
        start_kyc = true
      }
    } else {
      kyc_style = 'verified'
      kyc_string = `Level${level} (KYC Verified)`
    }
    return (
      <div className="level-block row">
        <div className="col-2 pr-0 d-flex justify-content-between">
          <span>Account Level</span>
        </div>
        <div className={`${kyc_style} col-2`}>
          <div className="circle"></div>
          <span>{kyc_string}</span>
        </div>
        { start_kyc &&
          <div className="col">
            <Link to={routes.KYC} className="mr-2">
              <button type="button" className="button-blue">Start KYC</button>
            </Link>
            <span>(more information)</span>
          </div>
        }
        { warning &&
          <div className="failed-reason">
            <div className="header px-2 text-center">
              <img src={assets.warning} className="mr-3"/>
              KYC verification failed.
            </div>
            <div className="body p-2">
              <div className="label">Reason:</div>
              <textarea
                name="reason"
                id="reason"
                value={kyc_deny_reason}
                className="w-100"
                disabled
              />
              <div className="w-100 text-center">
                <button className="button button-md button-red mr-2"
                  onClick={(event) => this.onTryAgain()}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  onTryAgain = () => {
    const { authUser, history } = this.props

    db.doTryAgainKYC(authUser.uid)
    history.push(routes.KYC)
  }

  renderLevel = () => {
    const { level, kyc_status, kyc_deny_reason } = this.state
    return (
      <div className="account-block container-fluid px-0">
        <div className="row">
          <div className="col-2">
            Account Type
          </div>
          <div className="col">
            Individual (change type)
          </div>
        </div>
        {this.renderKYCApproval()}
      </div>
    )
  }

  render() {
    const { id, firstname, lastname, displayname, email, error } = this.state;

    if (!id) {
      return <div></div>
    }

    // const isInvalid =
    //   firstname === '' ||
    //   lastname === '' ||
    //   displayname === '' ||
    //   email === '';

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="title mb-4">
          Account
          <span className="ml-2">[ID:{getFormattedID(id, 5)}]</span>
        </div>
        <div className="profile-block mb-3">
          <div className="subtitle">
            Profile
          </div>
          {this.renderLevel()}
          <div className="info-title">
            Basic Information
          </div>
          <div className="information-block row">
            <div className="col-3">
              <label htmlFor="firstname">FirstName</label>
              <input
                name="firstname"
                id="firstname"
                type="text"
                className="w-100"
                value={firstname}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="col-3">
              <label htmlFor="lastname">LastName</label>
              <input
                name="lastname"
                id="lastname"
                type="text"
                className="w-100"
                value={lastname}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="col-3">
              <label htmlFor="displayname">DisplayName</label>
              <input
                name="displayname"
                id="displayname"
                type="text"
                className="w-100"
                value={displayname}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="col-3">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                className="w-100"
                value={email}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          {error && <p className="alert alert-light">{error.message}</p>}
        </div>
        <PasswordChangeForm />
        <div className="mt-5 d-flex justify-content-center">
          <button type="submit" className="button-md button-red">
            Save Changes
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ authUser, user }) => {
  return {
    authUser,
    user,
  }
}

const Connected_ProfileChangeForm = withRouter(connect(mapStateToProps, actions)(ProfileChangeForm))

export default AccountPage;
