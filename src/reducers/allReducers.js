import { combineReducers } from "redux";
import setClickedFloor from "./setClickedFloor";
import setClickedRoom from "./setClickedRoom";
import setWindowWidth from "./setWindowWidth";
import setLanguage from "./setLanguage";

export default combineReducers({
  setClickedFloor: setClickedFloor,
  setClickedRoom: setClickedRoom,
  setWindowWidth: setWindowWidth,
  setLanguage: setLanguage,
});
