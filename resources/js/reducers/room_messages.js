
export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_ROOM_MESSAGES":
      return action.payload;
    default:
      return state;
  }
};
