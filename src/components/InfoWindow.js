import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setClickedFloor } from "../actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import buildingsData from "../data/buildingsData";

function InfoWindow({ clickedFloor, language, setClickedFloor }) {
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
        {floorText.name ? (
          <div className="text-container">
            <h1>{`${floorText.name[language]}`}</h1>
            <p>{`${floorText.description[language]}`}</p>
            {floorText.tourLink ? (
              <a href={`${floorText.tourLink}`}>Go to virtual tour</a>
            ) : null}
          </div>
        ) : null}

        <div
          className="btn btn-close"
          onClick={() => {
            setClickedFloor(null);
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
    language: state.setLanguage.language,
  };
};

const mapDispatchToProps = {
  setClickedFloor,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
