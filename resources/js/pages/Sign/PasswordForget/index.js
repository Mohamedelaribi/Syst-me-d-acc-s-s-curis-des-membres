import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);


const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault();

    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className="form-control"
        />
        <button disabled={isInvalid} type="submit" className="btn">
          Reset My Password
        </button>

        {error && <p className="alert alert-light">{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="pw-forgot">
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </div>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
