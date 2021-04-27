import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { useLoader } from "react-three-fiber";
import LoadPlantModel from "../functions/LoadPlantModel";
//import chimney_image from '/chimney_stripes.jpg'

const FloorsModel = ({
  windowWidth,
  clickedFloor,
  clickedRoom,
  onClickedFloorChange,
  onClickedRoomChange,
}) => {
  const [
    groundMesh,
    roadMesh,
    buildingsMesh,
    chimneyMeshes,
    activeBuildings,
    pipesMeshes,
    windowsMesh,
  ] = LoadPlantModel();

  LoadPlantModel();

  //console.log(pipesMeshes);

  const buildingsTexture = useLoader(
    THREE.TextureLoader,
    "./models/buildings_main_Base_Color.jpg"
  );
  buildingsTexture.wrapS = THREE.RepeatWrapping;
  buildingsTexture.wrapT = THREE.RepeatWrapping;
  buildingsTexture.repeat.set(1, 1);

  const groundTexture = useLoader(
    THREE.TextureLoader,
    "./models/ground_Base_Color.jpg"
  );
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(1, 1);

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
    // if (clickedFloor === null) {
    //   if (mouseInside) {
    //     setHoveredFloor(index);
    //   } else if (hoveredFloor === index) {
    //     setHoveredFloor(null);
    //   }
    // } else {
    //   setHoveredFloor(null);
    // }

    if (mouseInside) {
      setHoveredFloor(index);
    } else if (hoveredFloor === index) {
      setHoveredFloor(null);
    }
  };

  const clickedOnFloor = (index) => {
    onClickedFloorChange(index);
    // if (clickedFloor === null) {
    //   onClickedFloorChange(index);
    // }
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
    <group
      ref={buildingRef}
      position={[0, 0, 0]}
      rotation={convertDegreesToRadians(-90, 0, 0)}
    >
      {activeBuildings.map((building, buildingIndex) => (
        <mesh
          geometry={building}
          key={buildingIndex}
          dispose={null}
          onPointerOver={(e) => {
            e.stopPropagation();
            hoveredOnFloor(buildingIndex, true);
          }}
          onPointerOut={(e) => {
            e.intersections.length && hoveredOnFloor(buildingIndex, false);
          }}
          onClick={(e) => {
            e.stopPropagation();
            clickedOnFloor(buildingIndex);
          }}
        >
          <meshStandardMaterial
            attach="material"
            transparent={true}
            map={buildingsTexture}
            color={hoveredFloor === buildingIndex ? "#A96666" : "white"}
          />
        </mesh>
      ))}
      <mesh geometry={windowsMesh}>
        <meshStandardMaterial
          attach="material"
          transparent={true}
          color={"white"}
          map={buildingsTexture}
        />
      </mesh>
      <mesh geometry={groundMesh}>
        <meshStandardMaterial
          attach="material"
          transparent={true}
          map={groundTexture}
          color={"white"}
        />
      </mesh>
      <mesh geometry={roadMesh}>
        <meshStandardMaterial
          attach="material"
          transparent={true}
          color={"#CDCDCD"}
        />
      </mesh>
      <mesh geometry={buildingsMesh}>
        <meshStandardMaterial
          attach="material"
          transparent={true}
          color={"white"}
        />
      </mesh>
      <mesh geometry={chimneyMeshes.chimneyMesh01}>
        <meshStandardMaterial
          attach="material"
          color={"white"}
          map={buildingsTexture}
        />
      </mesh>
      <mesh geometry={chimneyMeshes.chimneyMesh02}>
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh geometry={chimneyMeshes.chimneyMesh03}>
        <meshStandardMaterial
          attach="material"
          color={"white"}
          map={buildingsTexture}
        />
      </mesh>
      <mesh geometry={pipesMeshes.pipesGreyMesh}>
        <meshStandardMaterial attach="material" color={"#CDCDCD"} />
      </mesh>
      <mesh geometry={pipesMeshes.pipesYellowMesh}>
        <meshStandardMaterial attach="material" color={"yellow"} />
      </mesh>
      <mesh geometry={pipesMeshes.pipesSupportMesh}>
        <meshStandardMaterial attach="material" color={"yellow"} />
      </mesh>
    </group>
  );
};

export default FloorsModel;
