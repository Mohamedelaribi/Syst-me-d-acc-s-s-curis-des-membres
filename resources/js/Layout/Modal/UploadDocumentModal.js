
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../firebase';

import assets from '../../assets';

import * as functions from '../../functions';

import DOCUMENT_TYPES from '../../constants/document_types';

const INITIAL_STATE = {
  document_title: '',
  document_file: null,
  doctype: 0,
  other: '',
  issued: '',
  certified: 0,
  comment: '',
  folder: 'legal',
  newfolder: '',
}

class UploadDocumentModal extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onUpload = () => {
    const { authUser, room, user } = this.props
    const { document_title, document_file, doctype, other, issued, certified, comment, folder, newfolder } = this.state ;

    if (document_file === null) {
      alert('Choose document to upload')
      return
    }
    if (folder === 'create') {
      if (newfolder === '') {
        alert('Input folder name to create')
        return
      }
    }

    let url = functions.getFormattedID(room.id, 4) + '_' + functions.getFormattedID(user.id, 4) + '_' + String(DOCUMENT_TYPES[doctype]).replace(" ", "").toUpperCase() + '_' + functions.getFormattedDate(new Date(), '.')

    functions.doFileUpload(document_file, url, 'document')
    .then(function (response) {
      const document_url = response.data
      db.doUploadDocument(room.rid, authUser.uid, document_title, DOCUMENT_TYPES[doctype], other, issued, certified, comment, folder, newfolder, document_url)
    })
    .catch(function (error) {
      alert(error)
    })
  };

  onDone = event => {
    event.preventDefault()

    this.onUpload()
    this.closeDialog()
  }

  onReset = () => {
    this.setState({ ...INITIAL_STATE });
  }

  closeDialog = () => {
    this.onReset()
    $('.modal-background').addClass('d-none')
    $('.upload-modal').addClass('d-none')
  }

  render() {
    const { authUser, room } = this.props
    const { document_title, document_file, doctype, other, issued, certified, comment, folder, newfolder } = this.state ;

    if (!authUser || !room) {
      return <div></div>
    }

    return (
      <div className="upload-modal mymodal d-none" onSubmit={this.onDone}>
        <form className="form-group">
          <div className="header d-flex justify-content-between align-items-center">
            <img src={assets.logo_transparent} className="size-40"/>
            <div className="d-flex align-items-center">
              <span className="title text-white mr-3">Upload Document</span>
              <img src={assets.upload_white} className="size-30"/>
            </div>
            <div
              className="close"
              onClick={(event) => {this.closeDialog()}}
            >
              <img src={assets.close} className="size-30"/>
            </div>
          </div>
          <div className="body p-4">
            <div className="mb-5">
              The upload document function is intended for forms/documents NOT included in the automated
              ClosingRoom series, eg. Bank statements, LOA’s, LOI’s.
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <button className="button-white px-2 py-1"
                  onClick={(event)=>{
                    event.preventDefault();
                    $('input[type=file][name=document_file]').click()}
                  }
                >
                  <span className="mr-2">Browse for Document</span>
                  <img src={assets.search_blue} className="size-15"/>
                </button>
                <input
                  name="document_file"
                  onChange={(e) => {
                    this.setState({
                      document_title: e.target.files[0].name,
                      document_file: e.target.files[0],
                    });
                  }}
                  type="file"
                  className="d-none"
                />
              </div>
              <div className="col">
                <input
                  name="document"
                  id="document"
                  type="text"
                  readOnly
                  value={document_title}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="doctype">Document Type:</label>
              </div>
              <div className="col-3">
                <select
                  name="doctype"
                  id="doctype"
                  value={doctype}
                  onChange={this.onChange}
                >
                  { DOCUMENT_TYPES.map((dtype, index) => (
                    <option key={index} value={index}>{dtype}</option>
                  ))}
                </select>
              </div>
              { doctype == '3' &&
                <div className="col-4">
                  <label htmlFor="other">If other:</label>
                  <input
                    name="other"
                    id="other"
                    type="text"
                    value={other}
                    onChange={this.onChange}
                  />
                </div>
              }
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="issued">Data Issued:</label>
              </div>
              <div className="col-3">
                <input
                  name="issued"
                  id="issued"
                  type="text"
                  value={issued}
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="certified">Certified:</label>
              </div>
              <div className="col-3">
                <select
                  name="certified"
                  id="certified"
                  value={certified}
                  onChange={this.onChange}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <label htmlFor="comment">Comment:</label>
              </div>
              <div className="col-3">
                <textarea
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={this.onChange}
                  rows="3"
                  cols="30"
                />
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-3">
                <label htmlFor="folder">Folder:</label>
              </div>
              <div className="col-3">
                <select
                  name="folder"
                  id="folder"
                  value={folder}
                  onChange={this.onChange}
                >
                  <option value="legal">Legal</option>
                  <option value="upload">Other</option>
                  {_.map(room.documents.folders, (folder, key) => (
                    <option key={key} value={key}>{folder.title}</option>
                  ))}
                  <option value="create" className="text-uppercase">Create New Folder</option>
                </select>
              </div>
              { folder == 'create' &&
                <div className="col-4">
                  <label htmlFor="newfolder">New Folder:</label>
                  <input
                    name="newfolder"
                    id="newfolder"
                    type="text"
                    value={newfolder}
                    onChange={this.onChange}
                  />
                </div>
              }
            </div>
            <div className="text-center">
              <button type="submit" className="button-green-outline mx-3">
                Upload
              </button>
              <button type="button" className="button-red-outline mx-3"
                onClick={this.closeDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
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

export default connect(mapStateToProps)(UploadDocumentModal);
