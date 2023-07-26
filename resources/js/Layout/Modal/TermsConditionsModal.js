
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../firebase';

import assets from '../../assets';

import { getFormattedDate, getFormattedID } from '../../functions';

import DOCUMENT_TYPES from '../../constants/document_types';

const INITIAL_STATE = {
  tc_agree: false,
  scrollBottom: false,
}

class TermsConditionsModal extends Component {
  state = { ...INITIAL_STATE };

  escFunction(event){
    if(event.keyCode === 27) {
      //Do whatever when esc is pressed
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  onReset = () => {
    this.setState({ ...INITIAL_STATE });
  }

  closeDialog = () => {
    $('.modal-background').addClass('d-none')
    $('.termsconditions-modal').addClass('d-none')
  }

  onRegister = (event) => {
    event.preventDefault()

    const { tc_agree } = this.state

    if (tc_agree === false) {
      alert('Please agree Terms & Conditions agreement')
      return
    }

    this.onReset()
    this.closeDialog()
    $('.signup-form #tc_agree').val('1')
    document.querySelector('.signup-form').dispatchEvent(new Event('submit'))
  }

  onScrollContent = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      this.setState({scrollBottom: true})
    } else {
      this.setState({scrollBottom: false})
    }
  }

  render() {
    const { tc_agree, scrollBottom } = this.state
    // const isInvalid = !(tc_agree & scrollBottom)

    return (
      <div className="tc-modal mymodal bg-white p-3 d-none">
        <div className="header text-center px-3 mb-3">
          <span className="title">Terms &amp; Conditions</span>
        </div>
        <div className="body bg-white px-4">
          <div className="content p-4 mb-3"
            onScroll={this.onScrollContent}
          >
            <div className="">
              You have been invited to participate in this <b>ClosingRoom</b> as an <b>‘Intermediary’</b>.<br/>
              In order for <b>ClosingRoom</b> Admins/Managers to streamline the closing process’s, <b>Intermediaries</b> are required to allow <b>Room Admins</b> <u>partial</u> access to their personal KYC data, this access includes:<br/>
              <i>First Name</i><br/>
              <i>Last Name</i><br/>
              <i>Passport Scan</i><br/>
              <i>Proof of Address Scan</i><br/>
              This data is only available to <b>Room Admins</b> upon request and shall only be used for purposes pertinent to the negotiations/contracts inside this <b>ClosingRoom</b>.<br/><br/>
            </div>
            <div className="d-flex justify-content-center px-5">
              <input
                type="checkbox"
                checked={tc_agree}
                className="mt-1 mr-2"
                onChange={(event) => {
                  this.setState({tc_agree: event.target.checked})
                }}
              />
              <span>I agree and give permission to the ClosingRoom admin to view my personal KYC information and data uploaded during the KYC process.</span>
            </div>
          </div>
          { scrollBottom &&
            <div className="text-center">
              <button type="button" id="button-register" className="button button-md button-red border-0"
                onClick={this.onRegister}
              >
                Register
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, room, user }) => {
  return {
    authUser,
    room,
    user,
  }
}

export default connect(mapStateToProps)(TermsConditionsModal);
