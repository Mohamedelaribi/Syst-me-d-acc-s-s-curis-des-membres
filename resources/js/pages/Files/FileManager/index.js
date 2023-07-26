import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../../firebase';

import * as routes from '../../../constants/routes';
import assets from '../../../assets';

import * as functions from '../../../functions';

import * as actions from '../../../actions';

import _ from 'lodash';

import GeneralDocuments from './GeneralDocuments';
import LegalDocuments from './LegalDocuments';
import UserUploadFiles from './UserUploadFiles';
import UsersDocumentation from './UsersDocumentation';
import CustomFolders from './CustomFolders';

const INITIAL_STATE = {
  expanded: true,
}

class FileManager extends Component {
  state = { ...INITIAL_STATE };

  renderDocuments = () => {
    const { expanded } = this.state
    return (
      <table className="table filestable text-center">
        <thead>
          <tr>
            <th></th>
            <th>Status</th>
            <th>Document Type</th>
            <th>Active</th>
            <th>Created/Uploaded</th>
            <th>Last Edit</th>
            <th>Download</th>
            <th>Fill and Sign</th>
            <th>Uploaded by</th>
            <th>Jurisdiction</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-left" colSpan={11}>
              <button className="button button-transparent"
                onClick={(event)=>{this.setState({expanded: !expanded})}}
              >
                <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
              </button>
              Files
            </th>
          </tr>
          { expanded &&
            [
              <UsersDocumentation key="users"/>,
              <GeneralDocuments key="general"/>,
              <LegalDocuments key="legal"/>,
              <UserUploadFiles key="upload"/>,
              <CustomFolders key="custom"/>,
            ]
          }
        </tbody>
      </table>
    )
  }

  onOpenUploadModal = () => {
    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')
  }

  onNewFolder = () => {
    const { room } = this.props
    db.doNewFolder(room.rid)
  }

  render() {
    return (
      <div className="filemanager-pane">
        <div className="documents-block">
          {this.renderDocuments()}
        </div>
        <div className="button-block d-flex mt-auto mb-3 ml-4">
          <button className="button-white border-0 d-flex align-items-center mr-3"
            onClick={(event) => this.onNewFolder()}
          >
            <img src={assets.plus_black} className="size-20 mr-2"/>
            <u>New Folder</u>
          </button>
          <button className="button-white d-flex align-items-center px-2 py-1 rounded shadow mr-3"
            onClick={this.onOpenUploadModal}
          >
            <span className="mr-2">Upload a File</span>
            <img src={assets.upload_blue} className="size-20"/>
          </button>
          <button className="button-white d-flex align-items-center px-2 py-1 rounded shadow"
            onClick={(event) => {alert('Coming Soon')}}
          >
            Download All (.zip)
          </button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ room }) => {
  return {
    room,
  }
}

export default withRouter(connect(mapStateToProps, actions)(FileManager));
