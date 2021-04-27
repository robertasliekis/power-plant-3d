const initialState = {
  width: 0,
};

const setWidth = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WIDTH":
      return { ...state, width: action.payload };
    default:
      return state;
  }
};

export default setWidth;
