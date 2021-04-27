const initialState = {
  hoveredBuilding: null,
};

const setHoveredBuilding = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOVERED_BUILDING":
      return { ...state, hoveredBuilding: action.payload };
    default:
      return state;
  }
};

export default setHoveredBuilding;
