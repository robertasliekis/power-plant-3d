import React from "react";
import { connect } from "react-redux";
import { setLanguage } from "../actions";

function IntroWindow({ language, setLanguage }) {
  return (
    <div
      className="intro-window-container"
      style={{ display: language === null ? "flex" : "none" }}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolores
        vitae quod consequuntur voluptas atque doloremque nisi, assumenda
        eligendi optio corrupti dicta tempora distinctio omnis labore saepe
        error mollitia esse.
      </p>
      <h1>Pasirinkite kalbą:</h1>
      <div className="buttons">
        <div className="btn btn-lt" onClick={() => setLanguage(0)}>
          LT
        </div>
        <div className="btn btn-en" onClick={() => setLanguage(1)}>
          EN
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.setLanguage.language,
  };
};

const mapDispatchToProps = {
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroWindow);
