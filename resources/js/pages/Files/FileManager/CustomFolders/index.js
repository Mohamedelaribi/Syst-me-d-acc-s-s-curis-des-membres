import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import _ from 'lodash';

import Folder from './Folder';


const CustomFolders = (props) => {
  const { room } = props
  return _.map(room.documents.folders, (folder, key) => {
    folder.fid = key
    return <Folder key={key} folder={folder}/>
  })
}

const mapStateToProps = ({ room }) => {
  return {
    room,
  }
}

export default connect(mapStateToProps)(CustomFolders);
