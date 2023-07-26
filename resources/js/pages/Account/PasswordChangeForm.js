import React, { Component } from 'react';

import { auth } from '../../firebase';

const INITIAL_STATE = {
  passwordOld: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE };

  onUpdatePassword = event => {
    event.preventDefault();

    const { passwordOld, passwordOne, passwordTwo, error } = this.state;

    if (passwordOld === '' || passwordOne === '') {
      alert('Input password correctly')
      $('#passwordOld').focus()
      return
    }
    if (passwordOne !== passwordTwo) {
      alert('Password not match')
      $('#passwordTwo').focus()
      return
    }

    // auth
    //   .doCheckPassword(passwordOld)
    //   .then(() => {
        auth
          .doPasswordUpdate(passwordOne)
          .then(() => {
            alert('Password changed successfully')
            this.setState(INITIAL_STATE)
          })
          .catch(error => {
            alert(error)
            this.setState({ error });
          });
      // })
      // .catch(error => {
      //   this.setState({ error });
      // });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOld, passwordOne, passwordTwo, error } = this.state;

    // const isInvalid =
    //   passwordOld === '' ||
    //   passwordOne === '' ||
    //   passwordOne !== passwordTwo;

    return (
      <div className="password-change-form">
        <div className="subtitle">
          Password
        </div>
        <div className="passwords-block row mb-2">
          <div className="col-3">
            <label htmlFor="passwordOld">Current Password</label>
            <input
              name="passwordOld"
              id="passwordOld"
              value={passwordOld}
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div className="col-3">
            <label htmlFor="passwordOne">New Password</label>
            <input
              name="passwordOne"
              id="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
            />
          </div>
          <div className="col-3">
            <label htmlFor="passwordTwo">Confirm Password</label>
            <input
              name="passwordTwo"
              id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
            />
          </div>
        </div>
        {error && <p className="alert alert-light">{error.message}</p>}
        <div>
          <button type="button" className="button-blue"
            onClick={this.onUpdatePassword}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default PasswordChangeForm;
