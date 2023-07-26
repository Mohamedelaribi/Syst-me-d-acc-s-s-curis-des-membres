import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../../../firebase';

import * as routes from '../../../../constants/routes';
import assets from '../../../../assets';

import * as functions from '../../../../functions';

import * as actions from '../../../../actions';

import { SERVER_URL } from '../../../../constants/urls';

import KYCPDFForm from '../FileLinkForms/KYCPDFForm';
import DocumentLinkForm from '../FileLinkForms/DocumentLinkForm';

import _ from 'lodash';

const INITIAL_STATE = {
  expanded: true,
}

class UserDocumentation extends Component {
  state = { ...INITIAL_STATE };

  renderUserDocument = (type, title) => {
    const { user } = this.props
    return (
      <tr key={type} className="level-3">
        <td className="text-left"><img src={assets.file_blue} className="size-20"/> {functions.getFormattedID(user.id, 4)}.{title}.pdf</td>
        { functions.isVerified(user.level) ?
          <td><img src={assets.secure_transparent} className="size-20"/> Verified</td>
        :
          <td>Unverified</td>
        }
        <td className="text-uppercase">Personal Data</td>
        <td>N/A</td>
        <td>{functions.getFormattedDate(new Date(user.kyc_date || "2019/01/01"))}</td>
        <td>N/A</td>
        <td>
          {type == 'kyc' ?
            <KYCPDFForm {...this.props} download={true}>
              <img src={assets.download_blue} className="size-20"/>
            </KYCPDFForm>
          :
            <DocumentLinkForm type={type} url={type === 'passport' ? user.passport_url : user.address_url} download={true}>
              <img src={assets.download_blue} className="size-20"/>
            </DocumentLinkForm>
          }
        </td>
        <td>N/A</td>
        <td className="text-uppercase">System</td>
        <td>N/A</td>
        <td>
          {type == 'kyc' ?
            <KYCPDFForm {...this.props} download={false}>
              <img src={assets.search_black} className="size-20 mr-3"/>
              Preview
            </KYCPDFForm>
          :
            <DocumentLinkForm type={type} url={type === 'passport' ? user.passport_url : user.address_url} download={false}>
              <img src={assets.search_black} className="size-20 mr-3"/>
              Preview
            </DocumentLinkForm>
          }
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    return [
      this.renderUserDocument('kyc', 'KYC Information'),
      this.renderUserDocument('passport', 'Passport'),
      this.renderUserDocument('address', 'Proof of address'),
    ]
  }

  render() {
    const { user } = this.props
    const { expanded } = this.state
    let rows = [
      <tr key="group" className="level-2">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          [{functions.getFormattedID(user.id, 4)}] {user.displayname}
        </th>
      </tr>
    ]
    if (expanded) {
      rows = _.union(rows, this.renderDocuments())
    }
    return rows
  }
}

const mapStateToProps = ({ room }) => {
  return {
    room,
  }
}

export default withRouter(connect(mapStateToProps, actions)(UserDocumentation));
