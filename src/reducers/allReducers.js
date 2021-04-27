import { combineReducers } from "redux";
import setClickedFloor from "./setClickedFloor";
import setClickedRoom from "./setClickedRoom";
import setWindowWidth from "./setWindowWidth";
import setLanguage from "./setLanguage";
import setHoveredBuilding from "./setHoveredBuilding";
import setIntroWindowVisisble from "./setIntroWindowVisisble";

export default combineReducers({
  setClickedFloor: setClickedFloor,
  setClickedRoom: setClickedRoom,
  setWindowWidth: setWindowWidth,
  setLanguage: setLanguage,
  setHoveredBuilding: setHoveredBuilding,
  setIntroWindowVisisble: setIntroWindowVisisble,
});
