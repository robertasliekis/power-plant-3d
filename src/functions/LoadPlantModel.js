import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LoadPlantModel() {
  const { nodes } = useLoader(GLTFLoader, "./models/plant1.glb");

  const activeBuildings = [];
  const buildingNumbers = [1, 2, 3, 4, 5];

  const chimneyNumbers = [1, 2, 3];

  buildingNumbers.forEach((number, index) => {
    activeBuildings[index] = nodes[`tour_building_${number}_1`].geometry;
  });

  chimneyNumbers.forEach((number) => {
    activeBuildings.push(nodes[`smoke_detector_${number}_1`].geometry);
  });

  const groundMesh = nodes.ground_1.geometry;
  const roadMesh = nodes.road_1.geometry;
  const buildingsMesh = nodes.extra_buildings_1.geometry;

  const chimneyMesh01 = nodes.chimney_1_1.geometry;
  const chimneyMesh02 = nodes.chimney_2_1.geometry;
  const chimneyMesh03 = nodes.chimney_3_1.geometry;
  const chimneyMeshes = { chimneyMesh01, chimneyMesh02, chimneyMesh03 };

  const pipesGreyMesh = nodes.pipes_grey_1.geometry;
  const pipesYellowMesh = nodes.pipes_yellow_1.geometry;
  const pipesSupportMesh = nodes.pipe_support_1.geometry;
  const pipesMeshes = { pipesGreyMesh, pipesYellowMesh, pipesSupportMesh };

  //console.log(pipesMeshes);

  return [
    groundMesh,
    roadMesh,
    buildingsMesh,
    chimneyMeshes,
    activeBuildings,
    pipesMeshes,
  ];
}

export default LoadPlantModel;
