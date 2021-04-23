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
  ] = LoadPlantModel();

  LoadPlantModel();

  //console.log(pipesMeshes);

  const chimneyTexture = useLoader(
    THREE.TextureLoader,
    "./models/chimney_stripes.jpg"
  );
  chimneyTexture.wrapS = THREE.RepeatWrapping;
  chimneyTexture.wrapT = THREE.RepeatWrapping;
  chimneyTexture.repeat.set(1, 1);

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
            color={hoveredFloor === buildingIndex ? "#00FBFF" : "grey"}
          />
        </mesh>
      ))}
      <mesh geometry={groundMesh}>
        <meshStandardMaterial
          attach="material"
          transparent={true}
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
          map={chimneyTexture}
        />
      </mesh>
      <mesh geometry={chimneyMeshes.chimneyMesh02}>
        <meshStandardMaterial attach="material" color={"white"} />
      </mesh>
      <mesh geometry={chimneyMeshes.chimneyMesh03}>
        <meshStandardMaterial
          attach="material"
          color={"white"}
          map={chimneyTexture}
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
