import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import { auth, db, storage } from '../../firebase';

import * as functions from '../../functions';

import DefaultHeader from '../../Layout/Header/DefaultHeader';

const KYCPage = () => (
  <div className="kyc-page d-flex flex-column">
    <DefaultHeader className="header-blue" title="Basic KYC Process (Individual)" />
    <div className="page-content m-4">
      <Connected_KYCForm/>
    </div>
  </div>
);

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  occupation: '',
  passport: '',
  address: '',
  passport_file: null,
  address_file: null,
  error: null,
};

class KYCForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault();

    const { authUser, history } = this.props;
    const { firstname, lastname, occupation, passport, address, passport_file, address_file } = this.state

    if (passport_file === null) {
      alert('Passport file not uploaded yet')
      return
    }
    if (address_file === null) {
      alert('Address file not uploaded yet')
      return
    }

    functions.doFileUpload(passport_file, `passport-${authUser.uid}`, 'passport')
    .then(function (response) {
      const passport_url = response.data
      functions.doFileUpload(address_file, `address-${authUser.uid}`, 'address')
      .then(function (response) {
        const address_url = response.data
        db.doUserKYC(authUser.uid, firstname, lastname, occupation, passport, passport_url, address, address_url)

        alert('Your documents have been submitted and will be reviewed shortly.')
        history.push(routes.DASHBOARD)
      })
      .catch(function (error) {
        alert(error)
      })
    })
    .catch(function (error) {
      alert(error)
    })
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeFile = (name, files) => {
    this.setState({ [name]: files[0] });
    alert("Thank you, your document has been uploaded")
  };

  render() {
    const { firstname, lastname, occupation, passport, address, passport_file, address_file, error } = this.state;

    // const isInvalid =
    //   firstname === '' ||
    //   lastname === '' ||
    //   occupation === '' ||
    //   passport === '' ||
    //   address === '' ||
    //   passport_file === null ||
    //   address_file === null;

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="row">
          <div className="col-3">
            <label htmlFor="firstname" className="label">First Name:</label>
          </div>
          <div className="col-3">
            <input
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={this.onChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="lastname" className="label">Last Name:</label>
          </div>
          <div className="col-3">
            <input
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={this.onChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="occupation" className="label">Occupation:</label>
          </div>
          <div className="col-3">
            <input
              name="occupation"
              id="occupation"
              value={occupation}
              onChange={this.onChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="passport" className="label">Passport/ID Card No:</label>
          </div>
          <div className="col-3">
            <input
              name="passport"
              id="passport"
              value={passport}
              onChange={this.onChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="address" className="label">Address:</label>
          </div>
          <div className="col-3">
            <input
              name="address"
              id="address"
              value={address}
              onChange={this.onChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="passport mb-4">
          <div className="label">
            Passport Scan:
          </div>
          <div className="detail mb-3">
            *ID Card or passport with photograph, name, date of birth and nationality (and name change document if applicable)
          </div>
          <button
            onClick={(event)=>{
              event.preventDefault();
              $('input[type=file][name=passport_file]').click()}
            }
            className="button-lg button-blue"
          >
            Upload
          </button>
        </div>
        <div className="address mb-4">
          <div className="label">
            Proof of Address Scan:
          </div>
          <div className="detail mb-3">
            *Residential and permanent (if different) address proof e.g. copy of utility bill or bank statement issued within the last three months and displays name as per registration. E-statements and P.O. Box mailing addresses are not acceptable.
          </div>
          <button
            onClick={(event)=>{
              event.preventDefault();
              $('input[type=file][name=address_file]').click()}
            }
            className="button-lg button-blue"
          >
            Upload
          </button>
        </div>
        <input
          name="passport_file"
          onChange={(e) => this.onChangeFile('passport_file', e.target.files)}
          type="file"
          className="d-none"
        />
        <input
          name="address_file"
          onChange={(e) => this.onChangeFile('address_file', e.target.files)}
          type="file"
          className="d-none"
        />
        <div className="mt-5">
          <button type="submit" className="button-lg button-red">
            Submit for Review
          </button>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}
      </form>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  }
}

const Connected_KYCForm = withRouter(connect(mapStateToProps)(KYCForm))

export default KYCPage;
