import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import DefaultHeader from '../../Layout/Header/DefaultHeader';

import * as actions from '../../actions';

import ROLES from '../../constants/roles';

const UpdateRoomPage = (props) => (
  <div className="createroom-page d-flex flex-column">
    <DefaultHeader title="Update Room" />
    <div className="page-content flex-grow-1 m-4">
      <UpdateRoomForm {...props} />
    </div>
  </div>
);


const INITIAL_STATE = {
  roomname: '',
  level: 0,
  timelimit: 0,

  general_details: {
    net_gross_discount: '',
    amount_of_coins: '',
    bank_country_of_fiat_buyer: '',
    bank_country_of_fiat_seller: '',
    country_btc: '',
    tranche_size: '',
    face_to_face: '',
    lawyer_to_laywer: '',
    is_buyer_platform: '',
    is_seller_platform: '',
    is_buyer_onboarded_to_platform: '',
    is_seller_onboarded_to_platform: '',
    comments: '',
    error: null,
  },
};

class UpdateRoomForm extends Component {
  state = { ...INITIAL_STATE };

  componentWillMount() {
    const { rid } = this.props.match.params
    const { fetchRoom } = this.props
    fetchRoom(rid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { room, user } = props

    if (!room || !user) {
      return
    }

    const roomname = room.users[user.uid].roomname
    const general_details = room.documents.general.dealdetails

    this.setState({
      roomname,
      level: room.level,
      timelimit: room.timelimit,
      general_details
    })
  }

  onSubmit = event => {
    event.preventDefault();

    const { room, user, history } = this.props;
    const { roomname, timelimit, level, general_details } = this.state;

    if (roomname === '') {
      alert('Input roomname')
      $('#roomname').focus()
      return
    }
    if (!(level > 0)) {
      alert('Input valid level (>0)')
      $('#level').focus()
      return
    }
    if (!(timelimit > 0)) {
      alert('Input valid timelimit (>0)')
      $('#timelimit').focus()
      return
    }

    db.doChangeRoomname(room.rid, user.uid, roomname)
    db.doUpdateRoom(room.rid, user.uid, level, timelimit, general_details)
    .then(() => {
      history.push(`/rooms/${room.rid}`)
    })
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeGeneralDetails = event => {
    let general_details = {...this.state.general_details}
    general_details[event.target.name] = event.target.value
    this.setState({ general_details });
  };

  renderGeneralDetailField = (label, type, value) => (
    <div className="row">
      <div className="col-6">
        <label htmlFor={value} className="label">{label}</label>
      </div>
      <div className="col-6">
        <input
          id={value}
          name={value}
          value={this.state.general_details[value]}
          onChange={this.onChangeGeneralDetails}
          type={type}
        />
      </div>
    </div>
  )

  render() {
    const { room } = this.props
    const { roomname, level, timelimit, error } = this.state;

    if (!room) {
      return <div></div>
    }

    console.log(this.state)

    // const isInvalid =
    //   roomname === '' ||
    //   !(timelimit > 0);

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="header mb-4">
          <span className="title mr-4">ClosingRoom General Information</span>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <label htmlFor="roomname" className="label mandatory">
                  Room Nickname
                  <span> (only you will see this):</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  id="roomname"
                  name="roomname"
                  value={roomname}
                  onChange={this.onChange}
                  type="text"
                  placeholder="eg. 4/2 JP Morgan.."
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="level" className="label mandatory">Level:</label>
              </div>
              <div className="col-6">
                <input
                  id="level"
                  name="level"
                  value={level}
                  onChange={this.onChange}
                  type="number"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="timelimit" className="label mandatory">Time Limit(days):</label>
              </div>
              <div className="col-6">
                <input
                  id="timelimit"
                  name="timelimit"
                  value={timelimit}
                  onChange={this.onChange}
                  type="number"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="header mb-4">
          <span className="title mr-4">General Details</span>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            {this.renderGeneralDetailField('Net / Gross Discount:', 'text', 'net_gross_discount')}
            {this.renderGeneralDetailField('Bank/Country of Fiat (Buyer):', 'text', 'bank_country_of_fiat_buyer')}
            {this.renderGeneralDetailField('Country (BTC):', 'text', 'country_btc')}
            {this.renderGeneralDetailField('Face to Face:', 'text', 'face_to_face')}
            {this.renderGeneralDetailField('Lawyer to Lawyer:', 'text', 'lawyer_to_laywer')}
            {this.renderGeneralDetailField('Is Buyer a Platform?:', 'text', 'is_buyer_platform')}
            {this.renderGeneralDetailField('Is Seller a Platform?:', 'text', 'is_seller_platform')}
            {this.renderGeneralDetailField('Is Buyer onboarded to a Platform?:', 'text', 'is_buyer_onboarded_to_platform')}
            {this.renderGeneralDetailField('Is Seller onboarded to a Platform?:', 'text', 'is_seller_onboarded_to_platform')}
          </div>
          <div className="col-6 d-flex flex-column">
            {this.renderGeneralDetailField('Amount of Coins:', 'text', 'amount_of_coins')}
            {this.renderGeneralDetailField('Bank/Country of Fiat (Seller):', 'text', 'bank_country_of_fiat_seller')}
            {this.renderGeneralDetailField('Tranche Size (Daily):', 'text', 'tranche_size')}
            <div className="mt-auto">
              <label htmlFor='comments' className="label">Comments</label>
              <textarea
                id='comments'
                name='comments'
                rows='3'
                value={this.state.general_details['comments']}
                onChange={this.onChangeGeneralDetails}
                className="w-100"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="button button-md button-red">
            Save
          </button>
        </div>

        {error && <p className="alert alert-light">{error.message}</p>}
      </form>
    );
  }
}

const mapStateToProps = ({ authUser, room, user }) => {
  return {
    authUser,
    room,
    user,
  }
}

export default withRouter(connect(mapStateToProps, actions)(UpdateRoomPage));
