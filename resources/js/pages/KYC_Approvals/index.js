import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import DefaultHeader from '../../Layout/Header/DefaultHeader';

import * as actions from '../../actions';

import _ from 'lodash';


const INITIAL_STATE = {
  search: '',
}

class KYC_ApprovalsPage extends Component {
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

  render() {
    const { users, rooms } = this.props;
    const { search } = this.state

    if (!users || !rooms) {
      return <div></div>
    }

    return (
      <div className="accounts-page d-flex flex-column">
        <DefaultHeader title="KYC Approvals" />
        <div className="page-content flex-grow-1">
          <div className="header row mx-0 align-items-center">
            <div className="search-area col-4 d-flex align-items-center">
              <div className="col-2 text-white">Search</div>
              <div className="col-10">
                <input type="text" className="px-3"
                  value={search}
                  autoFocus
                  onChange = { (event) => { this.setState({search: event.target.value}) }}
                />
              </div>
            </div>
          </div>
          <table className="table mytable accounts">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Level</th>
                <th>Join Date</th>
                <th>Active Rooms</th>
                <th></th>
              </tr>
            </thead>
            { users &&
              <tbody>
                {Object.keys(users).map(key => {
                  let user = users[key]
                  if (user.kyc_status === "pending" && (user.firstname.toString().toLowerCase().includes(search.toLowerCase()) || user.lastname.toString().toLowerCase().includes(search.toLowerCase()))) {
                    return <UserRow key={key} user={user} rooms={rooms}/>
                  }
                })}
              </tbody>
            }
          </table>
        </div>
      </div>
    );
  }
}

const UserRow = ({user, rooms}) => {

  const renderActiveRooms = () => {
    let activeRooms = 0
    _.forEach(rooms, function(room) {
      let isActiveInRoom = false
      _.forEach(room.users, function(room_user, key) {
        if (key === user.uid) {
          isActiveInRoom = true
        }
      })
      activeRooms += isActiveInRoom
    });
    return activeRooms
  }

  return (
    <tr>
      <td>{functions.getFormattedID(user.id, 7)}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.level}</td>
      <td>{functions.getFormattedDate(new Date(user.join_date))}</td>
      <td>{renderActiveRooms()}</td>
      <td className="action">
        <Link to={`/KYC-approvals/${user.uid}`}>
          <button className="button button-md button-blue">
            View
          </button>
        </Link>
      </td>
    </tr>
  )
}

const mapStateToProps = ({ users, rooms }) => {
  return {
    users,
    rooms,
  }
}

export default withRouter(connect(mapStateToProps, actions)(KYC_ApprovalsPage));
