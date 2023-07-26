import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import assets from '../../../../assets';

import _ from 'lodash';

import RANKS from '../../../../constants/ranks';
import UserDocumentation from './UserDocumentation';


const INITIAL_STATE = {
  expanded: true,
}

class UsersDocumentation extends Component {
  state = { ...INITIAL_STATE };

  renderDocuments = () => {
    const { room, users } = this.props

    return _.map(room.users, (user, key) => {
      _.merge(user, users[key])
      if (user.rank == RANKS.INTERMEDIARY.index) {
        return <UserDocumentation key={key} user={user}/>
      }
    })
  }

  render() {
    const { expanded } = this.state
    let rows = [
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          Users Files/Documentation
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
  }
}

const mapStateToProps = ({ room, users }) => {
  return {
    room,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(UsersDocumentation));
