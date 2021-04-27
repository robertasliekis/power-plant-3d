const initialState = {
  language: 0,
};

const setLanguage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      let newLanguage = action.payload;
      if (newLanguage === undefined) {
        if (state.language === 1) {
          newLanguage = 0;
        } else {
          newLanguage = 1;
        }
      }
      return { ...state, language: newLanguage };
    default:
      return state;
  }
};

export default setLanguage;
