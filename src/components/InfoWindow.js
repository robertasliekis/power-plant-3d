import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setClickedFloor, setClickedRoom } from "../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import buildingsData from "../data/buildingsData";

function InfoWindow({ clickedFloor, setClickedFloor }) {
  const [floorText, setFloorText] = useState("");

  useEffect(() => {
    if (clickedFloor !== null) {
      setFloorText(buildingsData[clickedFloor]);
    }
  }, [clickedFloor]);

  return (
    <div className="info-window">
      <div
        className="floor-container container"
        style={{
          transform:
            clickedFloor !== null ? "translate(-100%, 0)" : "translate(0, 0)",
          opacity: clickedFloor !== null ? 1 : 0,
        }}
      >
        <div className="text-container">
          <h1>{`${floorText.name}`}</h1>
          <p>{`${floorText.description}`}</p>
          {floorText.tourLink ? (
            <a href={`${floorText.tourLink}`}>Go to virtual tour</a>
          ) : null}
        </div>
        <div
          className="btn btn-close"
          onClick={() => {
            setClickedFloor(null);
            setClickedRoom(null);
          }}
        >
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor,
  };
};

const mapDispatchToProps = {
  setClickedFloor,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
