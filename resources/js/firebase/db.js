import { db } from './firebase';

import * as actions from '../actions';
import ROLES from '../constants/roles';
import RANKS from '../constants/ranks';

// User API

export const doCreateUser = (uid, acctype, firstname, lastname, displayname, email, country, timezone) => {
  let join_date = Date.now()
  return db.ref('users').once('value')
  .then(function(snapshot) {
    db.ref(`users/${uid}`).set({
      id: snapshot.numChildren()+1,
      type: acctype,
      firstname,
      lastname,
      displayname,
      email,
      country,
      timezone,
      level: 0,
      join_date,
      verify: false,
    });
  })
}

export const doEmailVerifyUser = (uid) => (
  db.ref(`users/${uid}`).update({
    verify: true,
  })
);

export const onceGetUsers = () => (
  db.ref('users').once('value')
);

export const onceGetUser = (uid) => (
  db.ref(`users/${uid}`).once('value')
);

  // Other db APIs ...

export const onceGetRooms = () => (
  db.ref('rooms').once('value')
);

export const onceGetRoom = (rid) => (
  db.ref(`rooms/${rid}`).once('value')
)

export const doCreateRoom = (history, user, roomname, level, timelimit, general_details) => {
  db.ref('rooms').once('value')
  .then(function(snapshot) {
    let create_date = Date.now()
    let expire_date = new Date()
    expire_date.setDate(expire_date.getDate() + parseInt(timelimit))
    expire_date = Date.parse(expire_date)

    let room = db.ref('rooms').push({
      id: snapshot.numChildren()+1,
      roomname,
      level,
      timelimit,
      create_date,
      expire_date,
    });
    room.child(`users/${user.uid}`).set({
      roomname,
      rank: RANKS.ADMIN.index,
    })
    room.child(`documents/general`).set({
      dealdetails: general_details,
    })
    room.child(`documents/general/dealdetails`).update({
      active: true,
    })

    doCreateMessage(room.key, user.uid, null, 'Welcome')

    setTimeout(function(){
      history.push(`/rooms/${room.key}`)
    }, 1000);
  })
}

export const doUpdateRoom = (rid, uid, level, timelimit, general_details) => {
  db.ref(`rooms/${rid}`).update({
    level,
    timelimit,
  })
  return db.ref(`rooms/${rid}/documents/general`).update({
    dealdetails: general_details,
  })
}

export const doChangeRoomname = (rid, uid, roomname) => {
  if (uid != null) {
    db.ref(`rooms/${rid}/users/${uid}`).update({
      roomname: roomname,
    })
  } else {
    db.ref(`rooms/${rid}`).update({
      roomname: roomname,
    })
  }
};

export const usersRef = (rid) => (
  db.ref(`rooms/${rid}/users`)
);

export const messagesRef = (rid) => (
  db.ref(`rooms/${rid}/messages`)
);

export const doCreateMessage = (rid, sender_uid, receiver_uid, content) => {
  let date = Date.now()

  return db.ref(`rooms/${rid}/messages`).push({
    sender_uid,
    receiver_uid,
    content,
    date,
  })
}

export const doUserProfileUpdate = (uid, email, firstname, lastname, displayname) => (
  db.ref(`users/${uid}`).update({
    email,
    firstname,
    lastname,
    displayname,
  })
);

export const doUserKYC = (uid, firstname, lastname, occupation, passport, passport_url, address, address_url) => (
  db.ref(`users/${uid}`).update({
    firstname,
    lastname,
    occupation,
    passport,
    passport_url,
    address,
    address_url,
    kyc_status: 'pending',
  })
);

export const doUploadDocument = (rid, uid, title, doctype, other, issued, certified, comment, folder, newfolder, url) => {
  let date = Date.now()
  let doc_data = {
    title,
    type: doctype,
    other,
    issued,
    certified,
    comment,
    uid,
    create_date: date,
    url,
    active: true,
  }

  let doc_url
  if (folder === 'legal') {
    doc_url = 'legal'
  } else if (folder === 'upload') {
    doc_url = 'upload'
  } else if (folder === 'create') {
    return doNewFolder(rid, newfolder).child('documents').push(doc_data)
  } else {
    doc_url = `folders/${folder}/documents`
  }
  return db.ref(`rooms/${rid}/documents/${doc_url}`).push(doc_data)
};

export const onceGetDocuments = () => (
  db.ref('documents').once('value')
);

export const doApproveKYC = (uid) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'verified',
    level: 1,
  })
};

export const doDenyKYC = (uid, reason) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'failed',
    kyc_deny_reason: reason,
    level: 0,
  })
};

export const doTryAgainKYC = (uid) => {
  db.ref(`users/${uid}`).update({
    kyc_status: 'unverified',
    kyc_deny_reason: '',
    level: 0,
  })
};

export const doUpgradeUserToAdmin = (uid) => {
  db.ref(`users/${uid}`).update({
    level: 3,
  })
};

export const doNewFolder = (rid, title='New Folder') => (
  db.ref(`rooms/${rid}/documents/folders`).push({
    title,
  })
);

export const doChangeFoldername = (rid, folder_key, foldername) => {
  db.ref(`rooms/${rid}/documents/folders/${folder_key}`).update({
    title: foldername,
  })
};
