import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useMousePosition } from "../hooks/useMousePosition";

import { setClickedFloor } from "../actions";
import textData from "../data/textData";

import buildingsData from "../data/buildingsData";

function InfoWindow({
  clickedFloor,
  language,
  hoveredBuilding,
  introWindowVisible,
  setClickedFloor,
}) {
  const [buildingText, setBuildingText] = useState("");
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const mousePosition = useMousePosition();

  useEffect(() => {
    if (clickedFloor !== null) {
      setBuildingText(buildingsData[clickedFloor]);
      setShowInfoWindow(false);
    }
  }, [clickedFloor]);

  return (
    <div className="pop-up-windows">
      <div className="top-container">
        <div className="logo"></div>
        <div
          className="btn btn-info"
          onClick={() => {
            setShowInfoWindow(true);
            setClickedFloor(null);
          }}
          style={{
            opacity: introWindowVisible ? "0" : "1",
            pointerEvents: introWindowVisible ? "none" : "auto",
          }}
        ></div>
      </div>
      {hoveredBuilding !== null ? (
        <div
          className="building-hover-box"
          style={{
            transform: `translate(calc(-100vw + ${mousePosition.x + 20}px),${
              mousePosition.y + 10
            }px)`,
          }}
        >
          {hoveredBuilding < 5 ? (
            <h1>{`${language === 0 ? "Turas" : "Tour"} ${
              hoveredBuilding + 1
            }`}</h1>
          ) : null}
          <p>{buildingsData[hoveredBuilding].name[language]}</p>
        </div>
      ) : null}
      {/* <div
        className="disable-click-overlay"
        style={{ display: clickedFloor !== null ? "flex" : "none" }}
      ></div> */}
      <div
        className="pop-up-container container"
        style={{
          opacity: clickedFloor !== null ? 1 : 0,
          display: clickedFloor !== null ? "flex" : "none",
        }}
      >
        {buildingText.name ? (
          <div className="text-container">
            <h1>{buildingText.name[language]}</h1>
            {buildingText.tourLink ? (
              <a href={`${buildingText.tourLink}`}>{textData[3][language]}</a>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className="info-window"
        style={{ display: showInfoWindow ? "flex" : "none" }}
      >
        <div
          className="btn btn-close"
          onClick={() => setShowInfoWindow(false)}
        ></div>
        <h1>{textData[0][language]}</h1>
        <p>{textData[4][language]}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor,
    language: state.setLanguage.language,
    hoveredBuilding: state.setHoveredBuilding.hoveredBuilding,
    introWindowVisible: state.setIntroWindowVisisble.introWindowVisible,
  };
};

const mapDispatchToProps = {
  setClickedFloor,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoWindow);
