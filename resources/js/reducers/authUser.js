
export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_AUTHUSER":
      return action.payload;
    default:
      return state;
  }
};
