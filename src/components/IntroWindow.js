import React, { useState } from "react";
import { connect } from "react-redux";
import { setLanguage, setIntroWindowVisisble } from "../actions";
import textData from "../data/textData";

function IntroWindow({
  language,
  setLanguage,
  introWindowVisible,
  setIntroWindowVisisble,
}) {
  const [showWelcomeWindow, setShowWelcomeWindow] = useState(true);

  return (
    <div
      className="intro-window-container"
      style={{ display: introWindowVisible ? "flex" : "none" }}
    >
      <div
        className="welcome-container"
        style={{ display: showWelcomeWindow ? "flex" : "none" }}
      >
        <div className="middle-section">
          <h1>{textData[0][language]}</h1>
          <p>{textData[1][language]}</p>
          <div
            className="btn btn-start"
            onClick={() => {
              setShowWelcomeWindow(false);
              setTimeout(function () {
                setIntroWindowVisisble();
              }, 1500);
            }}
            style={{
              backgroundImage:
                language === 0
                  ? `url('./images/Asset 22.png')`
                  : `url('./images/Asset 21.png')`,
            }}
          ></div>
        </div>

        <div
          className="btn btn-language"
          onClick={() => {
            setLanguage();
          }}
          style={{
            backgroundImage:
              language === 0
                ? `url('./images/Asset 24.png')`
                : `url('./images/Asset 23.png')`,
          }}
        ></div>
      </div>
      <div
        className="info-container"
        style={{ display: showWelcomeWindow ? "none" : "flex" }}
      >
        <div className="image-rotate"></div>
        <p>{textData[2][language]}</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.setLanguage.language,
    introWindowVisible: state.setIntroWindowVisisble.introWindowVisible,
  };
};

const mapDispatchToProps = {
  setLanguage,
  setIntroWindowVisisble,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroWindow);
