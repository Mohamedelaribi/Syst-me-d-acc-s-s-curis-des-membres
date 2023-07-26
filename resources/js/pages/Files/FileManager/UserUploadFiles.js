import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentLinkForm from './FileLinkForms/DocumentLinkForm';
import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import * as actions from '../../../actions';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
}

class UserUploadFiles extends Component {
  state = { ...INITIAL_STATE };

  renderUploadDocument = (document) => {
    const { room } = this.props
    return (
      <tr key={document.did} className="level-2">
        <td className="text-left"><img src={assets.file_blue} className="size-20"/> {document.title || 'Document'}</td>
        <td><img src={assets.upload_blue} className="size-20"/> Uploaded</td>
        <td className="text-uppercase">{document.type}</td>
        <td>
          <input type="checkbox" defaultChecked={document.active}
            onChange={(event) => {functions.doSetTaskStatus(`rooms/${room.rid}/documents/upload/${document.did}`, event.target.checked)}}
          />
        </td>
        <td>{functions.getFormattedDate(new Date(document.create_date || "01/01/2019"))}</td>
        <td>N/A</td>
        <td>
          <DocumentLinkForm type="document" url={document.url} download={true}>
            <img src={assets.download_blue} className="size-20"/>
          </DocumentLinkForm>
        </td>
        <td>N/A</td>
        <td>{document.username}</td>
        <td>N/A</td>
        <td>
          <DocumentLinkForm type="document" url={document.url} download={false}>
            <img src={assets.search_black} className="size-20 mr-3"/>
            Preview
          </DocumentLinkForm>
        </td>
      </tr>
    )
  }

  renderDocuments = () => {
    const { room, users } = this.props
    return _.map(room.documents.upload, (document, did) => {
      let user = users[document.uid]
      document.username = user ? user.displayname : ''
      document.did = did
      return this.renderUploadDocument(document)
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
          User Uploaded Files
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

export default withRouter(connect(mapStateToProps, actions)(UserUploadFiles));
