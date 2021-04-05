import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

import LoadPlantModel from "../functions/LoadPlantModel";
import LoadFloorModel from "../functions/LoadFloorModel";

const FloorsModel = ({ windowWidth, clickedFloor, clickedRoom, onClickedFloorChange, onClickedRoomChange }) => {
  const [floorBaseMesh, floorSideMesh, floorsRoomsMeshes] = LoadFloorModel();

  const [groundMesh, roadMesh, buildingMesh, chimneyMesh01, chimneyMesh02, chimneyMesh03] = LoadPlantModel();

  LoadPlantModel();

  const buildingRef = useRef();
  const floorRefs = useRef([]);
  const materialRefs = useRef([]);
  const roomRefs = useRef([[], [], [], [], []]);
  const sideRefs = useRef([]);
  const floorDistance = 10;

  useFrame(() => {
    const setMeshOpacity = (opacity, index) => {
      materialRefs.current[index].opacity = opacity;
      sideRefs.current[index].opacity = opacity;
      roomRefs.current[index].forEach((roomRef) => {
        roomRef.opacity = opacity;
      });
    };

    const setMeshPosition = (meshRef, floorIndex, indexDifference) => {
      let floorGap = 0;
      if (indexDifference !== undefined) {
        floorGap = indexDifference * 30;
      }
      let floorPosition = floorIndex * floorDistance - floorGap;

      if (meshRef.position.y > floorPosition) {
        if (indexDifference > 0 || indexDifference === undefined) {
          meshRef.position.y -= animationSpeed;
        }
      } else if (meshRef.position.y < floorPosition) {
        if (indexDifference < 0 || indexDifference === undefined) {
          meshRef.position.y += animationSpeed;
        }
      }
    };

    const animationSpeed = 2;
    // buildingRef.current.rotation.y += 0.001;
    floorRefs.current.forEach((ref, index) => {
      let meshOpacity = 1;
      if (clickedFloor !== null) {
        let indexDifference = clickedFloor - index;
        meshOpacity = 0.2;
        if (clickedFloor !== index) {
          setMeshOpacity(meshOpacity, index);
        }
        setMeshPosition(ref, index, indexDifference);
      } else {
        setMeshOpacity(meshOpacity, index);
        setMeshPosition(ref, index);
      }
    });
  });

  const [hoveredFloor, setHoveredFloor] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const hoveredOnFloor = (index, mouseInside) => {
    if (clickedFloor === null) {
      if (mouseInside) {
        setHoveredFloor(index);
      } else if (hoveredFloor === index) {
        setHoveredFloor(null);
      }
    } else {
      setHoveredFloor(null);
    }
  };

  const clickedOnFloor = (index) => {
    if (clickedFloor === null) {
      onClickedFloorChange(index);
    }
  };

  const clickedOnRoom = (index, event) => {
    if (clickedFloor !== null) {
      event.stopPropagation();
      onClickedRoomChange(index);
    }
  };

  const hoveredOnRoom = (floorIndex, roomIndex, mouseInside, event) => {
    if (clickedFloor !== null && clickedFloor === floorIndex) {
      event.stopPropagation();
      if (mouseInside) {
        setHoveredRoom(roomIndex);
      } else if (hoveredRoom === roomIndex) {
        setHoveredRoom(null);
      }
    }
  };

  const convertDegreesToRadians = (x, y, z) => {
    let degrees = [x, y, z];
    return (degrees = degrees.map((degree) => degree * (Math.PI / 180)));
  };

  return (
    <group ref={buildingRef} position={[0, -20, 0]}>
      <mesh geometry={groundMesh}>
        <meshStandardMaterial attach="material" transparent={true} color={"white"} />
      </mesh>
      <mesh geometry={roadMesh}>
        <meshStandardMaterial attach="material" transparent={true} color={"black"} />
      </mesh>
      <mesh geometry={buildingMesh}>
        <meshStandardMaterial attach="material" transparent={true} color={"grey"} />
      </mesh>
      <mesh geometry={chimneyMesh01}>
        <meshStandardMaterial attach="material" transparent={true} color={"grey"} />
      </mesh>
      <mesh geometry={chimneyMesh02}>
        <meshStandardMaterial attach="material" transparent={true} color={"grey"} />
      </mesh>
      <mesh geometry={chimneyMesh03}>
        <meshStandardMaterial attach="material" transparent={true} color={"grey"} />
      </mesh>
    </group>
  );
};

export default FloorsModel;
