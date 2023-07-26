
export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_ROOM":
      return action.payload;
    default:
      return state;
  }
};
