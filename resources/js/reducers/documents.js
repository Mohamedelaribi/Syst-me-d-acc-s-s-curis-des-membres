
export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_DOCUMENTS":
      return action.payload;
    default:
      return state;
  }
};
