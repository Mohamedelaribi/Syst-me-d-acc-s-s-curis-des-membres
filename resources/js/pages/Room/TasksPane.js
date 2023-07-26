import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import assets from '../../assets';
import _ from 'lodash';

import PaneHeader from '../../Layout/Header/PaneHeader';

import DealDetailsForm from '../Files/FileManager/FileLinkForms/DealDetailsForm';
import DocumentLinkForm from '../Files/FileManager/FileLinkForms/DocumentLinkForm';

import * as functions from '../../functions';

const INITIAL_STATE = {
  expanded1: true,
  expanded2: true,
  expanded3: true,
}

class TasksPane extends Component {
  state = { ...INITIAL_STATE };

  renderGeneralDocuments = () => {
    const { room } = this.props
    const { expanded1 } = this.state
    const { general } = room.documents

    return (
      <div key="general" className="tasks-group mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">General</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded1: !expanded1 })}}
          >
          { expanded1 ?
            <img className="size-15" src={assets.angle_down_grey}/>
          :
            <img className="size-15" src={assets.angle_right_grey}/>
          }
          </button>
        </div>
        { expanded1 && general.dealdetails.active &&
          <div className="group-contents px-3">
            <div className="content d-flex justify-content-between">
              <div className="title">General Deal Details</div>
              <div className="link d-flex align-items-center">
                <Link to={`/room/${room.rid}/update`} className="mr-2">
                  Edit
                </Link>
                <DealDetailsForm room={room} download={false}>
                  View
                </DealDetailsForm>

              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderLegalDocuments = () => {
    const { room } = this.props
    const { expanded2 } = this.state
    const { legal } = room.documents

    if (!legal) {
      return
    }

    return (
      <div key="legal" className="tasks-group mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">Legal Documents</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded2: !expanded2 })}}
          >
          { expanded2 ?
            <img className="size-15" src={assets.angle_down_grey}/>
          :
            <img className="size-15" src={assets.angle_right_grey}/>
          }
          </button>
        </div>
        { expanded2 && legal.ncnda.active &&
          <div className="group-contents px-3">
            <div className="content d-flex justify-content-between">
              <div className="title">NCNDA</div>
              <div className="link">
                <a href="" target='_blank'>
                  View
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  renderUploadedDocuments = () => {
    const { room } = this.props
    const { expanded3 } = this.state
    return (
      <div key="upload" className="tasks-group mt-2">
        <div className="group-header px-2 d-flex justify-content-between">
          <div className="title">User Uploaded</div>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({ expanded3: !expanded3 })}}
          >
          { expanded3 ?
            <img className="size-15" src={assets.angle_down_grey}/>
          :
            <img className="size-15" src={assets.angle_right_grey}/>
          }
          </button>
        </div>
        { expanded3 &&
          <div className="group-contents px-3">
          { _.map(room.documents.upload, (document, key) => {
            if (document.active) {
              return (
                <div key={key} className="content d-flex justify-content-between">
                  <div className="title">{document.title||"Document"}</div>
                  <div className="link">
                    <DocumentLinkForm type="document" url={document.url} download={false}>
                      View
                    </DocumentLinkForm>
                  </div>
                </div>
              )
            }
          })}
          </div>
        }
      </div>
    )
  }

  renderTasks = () => {
    return [
      this.renderGeneralDocuments(),
      this.renderLegalDocuments(),
      this.renderUploadedDocuments(),
    ]
  }

  onOpenUploadModal = () => {
    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')
  }

  render() {
    const { room, user } = this.props

    return (
      <div className="tasks-pane d-flex flex-column">
        <PaneHeader title="Active Files"/>
        <div className="tasks-block flex-grow-1">
          {this.renderTasks()}
        </div>
        <div className="view-files text-center mt-auto mb-5">
          <button className="button-white px-2 py-1 rounded shadow mb-3"
            onClick={this.onOpenUploadModal}
          >
            <span className="mr-2">Upload a File</span>
            <img src={assets.upload_blue} className="size-20"/>
          </button>
          { ((functions.isAdmin(user.level) || functions.isModerator(user.level)) || (room.users[user.uid] && functions.isRoomAdmin(room.users[user.uid].rank))) &&
            <Link to={`/room/${room.rid}/files`}>
              <button className="button-white px-2 py-1 rounded shadow">
                <span className="mr-2">Files and Task Room</span>
                <img className="size-20" src={assets.angle_right_grey}/>
              </button>
            </Link>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ room, user, documents }) => {
  return {
    room,
    user,
    documents,
  }
}

export default connect(mapStateToProps)(TasksPane);
