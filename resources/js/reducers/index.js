import { combineReducers } from 'redux';

import authUser from './authUser';
import users from './users';
import user from './user';
import rooms from './rooms';
import room from './room';
import room_messages from './room_messages';
import room_users from './room_users';
import documents from './documents';

export default combineReducers({
  authUser,
  users,
  user,
  rooms,
  room,
  room_messages,
  room_users,
  documents,
});
