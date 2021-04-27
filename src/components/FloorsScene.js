import React, { useRef, Suspense } from "react";
import { connect } from "react-redux";
import {
  setClickedFloor,
  setClickedRoom,
  setHoveredBuilding,
} from "../actions";
import { Canvas, useFrame, useThree, extend } from "react-three-fiber";
import { softShadows } from "drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PowerPlantModel from "./PowerPlantModel";

extend({ OrbitControls });
softShadows();

const CameraControls = ({ windowWidth }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  let minDistance = 50;
  let maxDistance = 250;
  // if (windowWidth < 450) {
  //   minDistance = 250;
  //   maxDistance = 400;
  // }
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={1.2}
      maxPolarAngle={1.2}
    />
  );
};

function FloorsScene({
  windowWidth,
  clickedFloor,
  clickedRoom,
  setClickedFloor,
  setClickedRoom,
  setHoveredBuilding,
}) {
  const clickedFloorChange = (index) => {
    setClickedFloor(index);
  };

  const clickedRoomChange = (index) => {
    setClickedRoom(index);
  };

  const hoveredBuildingChange = (index) => {
    setHoveredBuilding(index);
  };

  return (
    <div className="floor-scene-container">
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [160, 50, -140], fov: 30 }}
      >
        <CameraControls windowWidth={windowWidth} />
        <ambientLight intensity={0.6} />
        <pointLight position={[-10, 100, -20]} intensity={0.5} />
        <group>
          <Suspense fallback={null}>
            <PowerPlantModel
              onClickedFloorChange={clickedFloorChange}
              onClickedRoomChange={clickedRoomChange}
              onHoveredBuilgingChange={hoveredBuildingChange}
              clickedFloor={clickedFloor}
              clickedRoom={clickedRoom}
              windowWidth={windowWidth}
            />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    clickedFloor: state.setClickedFloor.clickedFloor,
    clickedRoom: state.setClickedRoom.clickedRoom,
    windowWidth: state.setWindowWidth.windowWidth,
  };
};

const mapDispatchToProps = {
  setClickedFloor,
  setClickedRoom,
  setHoveredBuilding,
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorsScene);
