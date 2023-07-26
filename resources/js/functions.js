import axios from 'axios';

import { db as firebaseDB } from './firebase/firebase'
import { auth as firebaseAuth } from './firebase';

import { SERVER_URL } from './constants/urls';

import * as routes from './constants/routes';

import ROLES from './constants/roles';
import RANKS from './constants/ranks';
import LEVELS from './constants/levels';

export const getFormattedDate = (date, separator='/') => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + separator + month + separator + year;
}

export const getFormattedTime = (date, ampm = false) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    if (ampm == true) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
}

export const getFormattedID = (id, length) => {
    return (id?String(id).padStart(length, '0'):'')
}

export const isVerified = (level) => {
    return parseInt(level) >= LEVELS.VERIFIED.index
}

export const isAdmin = (level) => {
    return parseInt(level) == LEVELS.ADMIN.index
}

export const isModerator = (level) => {
    return parseInt(level) == LEVELS.MODERATOR.index
}

export const isNormalUser = (level) => {
    return parseInt(level) == LEVELS.UNVERIFIED.index || parseInt(level) == LEVELS.VERIFIED.index
}

export const isRoomAdmin = (rank) => {
    return parseInt(rank) == RANKS.ADMIN.index
}

export const doLogout = () => {
    firebaseAuth.doSignOut()
}

export const doSendInviteEmail = (room, authUser, invite, users) => {
    invite.role = parseInt(invite.role)

    let user_invited = null
    _.forEach(users, (user, index) => {
        if (invite.email.toLowerCase() === user.email.toLowerCase()) {
            user_invited = user
        }
    })

    let rank
    if (invite.admin) {
        rank = 1
    } else {
        if (_.includes(_.map([ROLES.BUYER, ROLES.SELLER, ROLES.BUYER_MANDATE, ROLES.SELLER_MANDATE], _.property('index')), invite.role)) {
            rank = RANKS.INTERMEDIARY.index
        } else if (_.includes(_.map([ROLES.BUYER_INTERMEDIARY, ROLES.SELLER_INTERMEDIARY], _.property('index')), invite.role)) {
            rank = RANKS.INTERMEDIARY.index
        } else if (_.includes(_.map([ROLES.ESCROW_AGENT, ROLES.LAWYER], _.property('index')), invite.role)) {
            rank = RANKS.PROFESSIONAL.index
        }
    }

    let link
    if (user_invited) {
        firebaseDB.ref(`rooms/${room.rid}/users/${user_invited.uid}`).set({
            roomname: '',
            role: invite.role,
            rank,
        })
        link = `${SERVER_URL}/rooms/${room.rid}`
    } else {
        firebaseDB.ref(`rooms/${room.rid}/invites`).push({
            email: invite.email,
            role: invite.role,
            rank,
        })
        link = `${SERVER_URL}/signup`
    }

    const url = `${SERVER_URL}/api/send_invite_email?
        sender_email=${authUser.email}&
        receiver_email=${invite.email}&
        displayname=${authUser.displayname}&
        role=${_.find(ROLES, _.matchesProperty('index', invite.role)).label}&
        room_id=${getFormattedID(room.id, 6)}&
        participants=${_.size(room.users)}&
        link=${link}
    `;
    return axios.post(url)
}

export const doEnterInvitedRooms = (uid, email) => {
    firebaseDB.ref('rooms').on("value", snapshot => {
        let rooms = snapshot.val()
        _.map(rooms, (room, key) => {
            room.rid = key
        })
        _.forEach(rooms, function(room, index){
            let invites = room.invites
            if (invites) {
                Object.keys(invites).map(key => {
                    let invite = invites[key]
                    if (email.toLowerCase() === invite.email.toLowerCase()) {
                        firebaseDB.ref(`rooms/${room.rid}/invites/${key}`).remove()
                        firebaseDB.ref(`rooms/${room.rid}/users/${uid}`).set({
                            roomname: '',
                            role: invite.role,
                            rank: invite.rank,
                        })
                    }
                })
            }
        })
    })
}

export const doSetTaskStatus = (task_path, status) => {
    firebaseDB.ref(task_path).update({
        active: status,
    })
}

export const doSendVerifyEmail = (authUser, displayname) => {
    let link = `${SERVER_URL}/verify/${authUser.user.uid}`
    const url = `${SERVER_URL}/api/send_verify_email?
        email=${authUser.user.email}&
        displayname=${displayname}&
        link=${link}
    `;
    return axios.post(url)
}

export const doFileUpload = (file, file_url, type) => {
    const url = `${SERVER_URL}/api/file_upload?
        url=${type}/${file_url}
    `;
    let formData = new FormData();
    formData.append('file', file);
    return axios.post(url,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}
