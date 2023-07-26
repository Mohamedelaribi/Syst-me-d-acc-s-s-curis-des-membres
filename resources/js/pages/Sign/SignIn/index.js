import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignHeader from '../../../Layout/Header/SignHeader';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';

import * as actions from '../../../actions';

const SignInPage = (props) => (
  <div className="sign-page">
    <div className="sign-wrapper text-center">
      <SignHeader/>
      <SignInForm {...props} />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault()

    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // this.setState({ ...INITIAL_STATE });

        this.props.fetchAuthUser();

        setTimeout(function(){
          history.push(routes.DASHBOARD);
        }, 1000);

      })
      .catch(error => {
        alert(error)
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    // const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} className="sign-container signin-form">
        <div className="form-group login-title text-center text-white">
          ClosingRoom Login
        </div>
        <div className="row mt-4 mb-5 border-bottom border-white"></div>
        <div className="row form-group">
          <div className="col-3 text-right">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-6">
            <input
              name="email"
              id="email"
              value={email}
              onChange={this.onChange}
              type="text"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-3 text-right">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-6">
            <input
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
              type="password"
              className="form-control"
              required
            />
          </div>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}

        <div className="my-4">
          <button type="submit" className="button-md button-red px-3">
            Sign In
          </button>
        </div>

        <div className="row form-group">
          <div className="col-6 text-right">
            <span className="text-white">Not a member?</span>
          </div>
          <div className="col-6 text-left">
            <Link to={routes.SIGN_UP} className="">
              <button type="button" className="button-outline px-3">Register</button>
            </Link>
          </div>
        </div>

      </form>
    );
  }
}

export default withRouter(connect(null, actions)(SignInPage));
