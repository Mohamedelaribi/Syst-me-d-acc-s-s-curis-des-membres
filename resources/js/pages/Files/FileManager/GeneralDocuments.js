import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DealDetailsForm from './FileLinkForms/DealDetailsForm';
import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import * as actions from '../../../actions';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class GeneralDocuments extends Component {
  state = { ...INITIAL_STATE };

  renderDealDetail = () => {
    const { room } = this.props
    const dealdetails = room.documents.general.dealdetails

    return (
      <tr key="dealdetail" className="level-2">
        <td className="text-left"><img src={assets.file_blue} className="size-20"/> Deal Details</td>
        <td><img src={assets.status_working} className="size-20"/> Working</td>
        <td className="text-uppercase">General Terms</td>
        <td>
          <input type="checkbox" defaultChecked={dealdetails.active}
            onChange={(event) => {functions.doSetTaskStatus(`rooms/${room.rid}/documents/general/dealdetails`, event.target.checked)}}
          />
        </td>
        <td>{functions.getFormattedDate(new Date(room.create_date))}</td>
        <td></td>
        <td>
          <DealDetailsForm room={room} download={true}>
            <img src={assets.download_blue} className="size-20"/>
          </DealDetailsForm>
        </td>
        <td>
          <button className="button button-md button-lightgreen">
            <img src={assets.sign} className="size-20 mr-3"/>
            <span>Fill &amp; Sign</span>
          </button>
        </td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
          <DealDetailsForm room={room} download={false}>
            <img src={assets.search_black} className="size-20 mr-3"/>
            Preview
          </DealDetailsForm>
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    return [
      this.renderDealDetail()
    ]
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
          General
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
  }
}

const mapStateToProps = ({ room, }) => {
  return {
    room,
  }
}

export default withRouter(connect(mapStateToProps, actions)(GeneralDocuments));
