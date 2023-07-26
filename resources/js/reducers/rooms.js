
export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_ROOMS":
      return action.payload;
    default:
      return state;
  }
};
