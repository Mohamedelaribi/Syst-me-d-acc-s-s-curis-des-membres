import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import SignHeader from '../../../Layout/Header/SignHeader';

import { auth, db } from '../../../firebase';
import * as routes from '../../../constants/routes';

import * as actions from '../../../actions';

import * as functions from '../../../functions';

import moment from 'moment-timezone';

import ACCOUNT_TYPES from '../../../constants/account_types';


const SignUpPage = (props) => (
  <div className="sign-page">
    <div className="sign-wrapper text-center">
      <SignHeader/>
      <SignUpForm {...props} />
    </div>
  </div>
);

const INITIAL_STATE = {
  acctype: 0,
  firstname: '',
  lastname: '',
  displayname: '',
  emailOne: '',
  emailTwo: '',
  passwordOne: '',
  passwordTwo: '',
  country: '',
  timezones: null,
  timezone: '',
  error: null,
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault()

    const { acctype, firstname, lastname, displayname, emailOne, emailTwo, passwordOne, passwordTwo, country, timezone } = this.state;

    if (emailOne !== emailTwo) {
      alert('Email not match')
      $('#emailTwo').focus()
      return
    }
    if (passwordOne !== passwordTwo) {
      alert('Password not match')
      $('#passwordTwo').focus()
      return
    }

    if ($('.signup-form #tc_agree').val() === '0') {
      $('.modal-background').removeClass('d-none')
      $('.tc-modal').removeClass('d-none')
      return
    }

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(emailOne, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, acctype, firstname, lastname, displayname, emailOne, country, timezone)
          .then(() => {
            // this.setState({ ...INITIAL_STATE });

            setTimeout(function(){
              functions.doSendVerifyEmail(authUser, displayname)
              functions.doEnterInvitedRooms(authUser.user.uid, emailOne)
              alert("We sent verification email.\nPlease check your mail")
              history.push(routes.DASHBOARD);
            }, 1000);
          } )
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillMount() {
    const defaultTimeZone = moment.tz.guess();
    this.setState({timezone: defaultTimeZone})

    let timezones = []
    moment.tz.names().map(function(name, index){
      let timezone = {}
      timezone.location = name
      timezone.offset = moment(Date.now()).tz(name).format('Z')
      timezones.push(timezone)
    })
    this.setState({timezones})
  }

  render() {
    const { acctype, firstname, lastname, displayname, emailOne, emailTwo, passwordOne, passwordTwo, country, timezones, timezone, error } = this.state;

    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   firstname === '' ||
    //   lastname === '' ||
    //   displayname === '' ||
    //   email === '';

    return (
      <form onSubmit={this.onSubmit} className="sign-container signup-form">
        <input type="hidden" name="tc_agree" id="tc_agree" value='0'/>

        <div className="form-group account-type d-flex justify-content-around align-items-center">
          <label htmlFor="acctype">Account Type:</label>
          <select
            name="acctype"
            id="acctype"
            value={acctype}
            onChange={this.onChange}
            className="form-control"
          >
            {_.map(ACCOUNT_TYPES, (atype, key) => (
              <option key={key} value={atype.index}>{atype.label}</option>
            ))}
          </select>
        </div>
        <div className="row my-4 border-bottom border-white"></div>
        <div className="row form-group">
          <div className="col-6 text-left">
            <label htmlFor="firstname">First Name</label>
            <input
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={this.onChange}
              type="text"
              placeholder=""
              className="form-control"
              required
            />
          </div>
          <div className="col-6 text-left">
            <label htmlFor="lastname">Last Name</label>
            <input
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={this.onChange}
              type="text"
              placeholder=""
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-group text-left">
          <label htmlFor="displayname">Username / Display Name</label>
          <input
            name="displayname"
            id="displayname"
            value={displayname}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="form-control"
            required
          />
        </div>
        <div className="row form-group">
          <div className="col-6 text-left">
            <label htmlFor="">Email</label>
            <input
              name="emailOne"
              id="emailOne"
              value={emailOne}
              onChange={this.onChange}
              type="email"
              placeholder=""
              className="form-control"
              required
            />
          </div>
          <div className="col-6 text-left">
            <label htmlFor="">Confirm Email</label>
            <input
              name="emailTwo"
              id="emailTwo"
              value={emailTwo}
              onChange={this.onChange}
              type="email"
              placeholder=""
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-6 text-left">
            <label htmlFor="passwordOne">Password</label>
            <input
              name="passwordOne"
              id="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder=""
              className="form-control"
              required
            />
          </div>
          <div className="col-6 text-left">
            <label htmlFor="passwordTwo">Repeat Password</label>
            <input
              name="passwordTwo"
              id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder=""
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 text-left">
            <label htmlFor="country">Country</label>
            <input
              name="country"
              id="country"
              value={country}
              onChange={this.onChange}
              type="text"
              placeholder=""
              className="form-control"
              required
            />
          </div>
          <div className="col-6 text-left">
            <label htmlFor="timezone">Country/TimeZone</label>
            { timezones &&
              <select
                name="timezone"
                id="timezone"
                value={timezone}
                onChange={this.onChange}
                className="form-control"
              >
                {timezones.map(function(tz, index){
                  return <option key={ index } value={tz.location}>{tz.location} {tz.offset}</option>
                })}
              </select>
            }
          </div>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}

        <div className="mb-3">
          <button className="button-md button-red px-2"
            onClick={this.onRegister}
          >
            Register
          </button>
        </div>

        <div className="row form-group">
          <div className="col-6 text-right">
            <span className="text-white">Already registered?</span>
          </div>
          <div className="col-6 text-left">
            <Link to={routes.SIGN_IN} className="">
              <button type="button" className="button-outline px-3">Sign In</button>
            </Link>
          </div>
        </div>

      </form>
    );
  }
}

export default withRouter(connect(null, actions)(SignUpPage));
