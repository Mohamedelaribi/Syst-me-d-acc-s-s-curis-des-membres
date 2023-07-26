import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentLinkForm from '../FileLinkForms/DocumentLinkForm';
import * as functions from '../../../../functions';

import { db } from '../../../../firebase';

import assets from '../../../../assets';

import _ from 'lodash';


const INITIAL_STATE = {
  expanded: true,
  folder: null,
  isEditingFoldername: false,
}

class Folder extends Component {
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
    const { folder } = props
    this.setState({
      folder: folder,
      isEditingFoldername: false,
    })
  }

  onEditFoldername = () => {
    this.setState({
      isEditingFoldername: true,
    })
  }

  onEnterFoldername = () => {
    const { room } = this.props
    const { folder } = this.state
    db.doChangeFoldername(room.rid, folder.fid, folder.title)

    this.setState({
      isEditingFoldername: false,
    })
  }

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
    const { users } = this.props
    const { folder } = this.state
    return _.map(folder.documents, (document, did) => {
      let user = users[document.uid]
      document.username = user ? user.displayname : ''
      document.did = did
      return this.renderUploadDocument(document)
    })
  }

  render() {
    const { expanded, folder, isEditingFoldername } = this.state

    if (!(!!folder)) {
      return <tr></tr>
    }

    let rows = [
      <tr key="group" className="level-1">
        <th className="text-left" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded: !expanded})}}
          >
            <img className="size-20" src={expanded?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          { isEditingFoldername ?
            <input
              type="text"
              className="text-left border-0 bg-transparent"
              placeholder="enter nickname"
              value={folder.title}
              autoFocus
              onChange = { (event) => {
                let folder = this.state.folder;
                folder.title = event.target.value;
                this.setState({folder: folder});
              }}
              onKeyPress={(event) => {
                if (event.keyCode == 13 || event.charCode == 13) {
                  this.onEnterFoldername()
                }
              }}
              onBlur={this.onEnterFoldername}
            />
          :
            <span onClick={(event) => this.onEditFoldername()}>
              { folder.title || 'New Folder'}
            </span>
          }
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

export default connect(mapStateToProps)(Folder);
