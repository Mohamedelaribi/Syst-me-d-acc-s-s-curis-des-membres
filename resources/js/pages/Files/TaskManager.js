import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import assets from '../../assets';

import * as functions from '../../functions';

import RoomHeader from '../../Layout/Header/RoomHeader';
import PaneHeader from '../../Layout/Header/PaneHeader';

import * as actions from '../../actions';

import _ from 'lodash';

const INITIAL_STATE = {
  expanded0: true,
  expanded1: true,
  expanded2: true,
  expanded3: true,
}

class TaskManager extends Component {
  state = { ...INITIAL_STATE };

  renderLegalDocuments = () => {
    const { room, documents, users } = this.props
    const { expanded1 } = this.state

    let group = (
      <tr key="legal">
        <td className="text-left pl-3" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded1: !expanded1})}}
          >
            <img className="size-20" src={expanded1?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          Legal Documents
        </td>
      </tr>
    )

    let legal_docs = Object.keys(documents).map(key => (
      <DocumentRow key={key} document={documents[key]} type="legal"/>
    ));

    if (!expanded1) {
      return group
    } else {
      return [
        group,
        legal_docs
      ]
    }
  }

  renderUploadedDocuments = () => {
    const { room, documents, users } = this.props
    const { expanded2 } = this.state

    let group = (
      <tr key="uploaded">
        <td className="text-left pl-3" colSpan={11}>
          <button className="button button-transparent"
            onClick={(event)=>{this.setState({expanded2: !expanded2})}}
          >
            <img className="size-20" src={expanded2?assets.angle_down_grey:assets.angle_right_grey}/>
          </button>
          Uploaded Documents
        </td>
      </tr>
    )

    let uploaded_docs = Object.keys(room.users).map(user_key => {
      let user = users[user_key]
      let user_documents = room.users[user_key].documents
      if (user_documents) {
        return Object.keys(user_documents).map(key => {
          let document = user_documents[key]
          document.username = user.displayname
          return <DocumentRow key={key} document={document} type="uploaded"/>
        })
      }
    })

    if (!expanded2) {
      return group
    } else {
      return [
        group,
        uploaded_docs
      ]
    }
  }

  renderDocuments = () => {
    const { expanded0 } = this.state
    return (
      <table className="table filestable text-center">
        <thead>
          <tr>
            <th width="200px"></th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Active</th>
            <th>Created/Uploaded</th>
            <th>Last Edit</th>
            <th>Download</th>
            <th width="200px">Fill and Sign</th>
            <th>Uploaded by</th>
            <th>Jurisdiction</th>
            <th></th>
          </tr>
          <tr key="uploaded">
            <th className="text-left" colSpan={11}>
              <button className="button button-transparent"
                onClick={(event)=>{this.setState({expanded0: !expanded0})}}
              >
                <img className="size-20" src={expanded0?assets.angle_down_grey:assets.angle_right_grey}/>
              </button>
              Files
            </th>
          </tr>
        </thead>
        { expanded0 &&
          <tbody>
            {this.renderLegalDocuments()}
            {this.renderUploadedDocuments()}
          </tbody>
        }
      </table>
    )
  }

  onOpenUploadModal = () => {
    const {room, uid} = this.props

    $('.modal-background').removeClass('d-none')
    $('.upload-modal').removeClass('d-none')

    $('.upload-modal').find('#roomKey').val(room.rid)
    $('.upload-modal').find('#roomID').val(room.id)
    $('.upload-modal').find('#userID').val(uid)
  }

  render() {
    const { room, documents } = this.props

    if (!room || !documents) {
      return <div></div>
    }

    return (
      <div className="taskmanager-pane h-50">
        <PaneHeader title={`Room ${functions.getFormattedID(room.id, 7)} - Task Manager`}/>
      </div>
    );
  }
}

const DocumentRow = (props) => {
  const { document, type } = props
  return (
    <tr>
      <td className="pl-5 title">{document.title}</td>
      <td className="type">{document.type}</td>
      { type === 'general' ?
        <td><img src={assets.status_working} className="size-20"/> Working</td>
      : ( type === 'legal' ?
          <td><img src={assets.status_incomplete} className="size-20"/> Incomplete</td>
        :
          <td><img src={assets.status_userupload} className="size-20"/> User Uploaded</td>
        )
      }
      <td><input type="checkbox" defaultChecked={true}/></td>
      <td>{functions.getFormattedDate(new Date(document.create_date || "02/01/2019"))}</td>
      <td>{functions.getFormattedDate(new Date("09/01/2019"))}</td>
      <td>
        <a href={document.url} download>
          <img src={assets.download_white} className="size-20"/>
        </a>
      </td>
      { (type === 'general' || type === 'legal') ?
        [
          <td key="sign">
            <button className="button button-md button-lightgreen">
              <img src={assets.sign} className="size-20 mr-3"/>
              Fill &amp; Sign
            </button>
          </td>,
          <td key="uploadedby"></td>
        ]
      :
        [
          <td key="sign"></td>,
          <td key="uploadedby">{document.username}</td>
        ]
      }
      <td></td>
      <td className="action">
        <a href={document.url} target='_blank'>
          <img src={assets.search_black} className="size-20 mr-3"/>
          Preview
        </a>
      </td>
    </tr>
  )
}

const mapStateToProps = ({ authUser, room, documents, users }) => {
  return {
    authUser,
    room,
    documents,
    users,
  }
}

export default withRouter(connect(mapStateToProps, actions)(TaskManager));
