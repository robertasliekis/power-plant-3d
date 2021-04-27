const initialState = {
  introWindowVisible: true,
};

const setIntroWindowVisisble = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INTRO_WINDOW_VISIBLE":
      return { ...state, introWindowVisible: !state.introWindowVisible };
    default:
      return state;
  }
};

export default setIntroWindowVisisble;
