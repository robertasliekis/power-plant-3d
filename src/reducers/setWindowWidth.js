const initialState = {
  windowWidth: null,
};

const setWindowWidth = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WINDOW_WIDTH":
      return { ...state, windowWidth: action.payload };
    default:
      return state;
  }
};

export default setWindowWidth;
