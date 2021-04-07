import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LoadPlantModel() {
  const { nodes } = useLoader(GLTFLoader, "./models/plant.glb");

  const activeBuildings = [];
  const buildingNumbers = [1, 2, 3, 4];

  buildingNumbers.forEach((number, index) => {
    activeBuildings[index] = nodes[`building${number}_1`].geometry;
  });

  const groundMesh = nodes.ground_1.geometry;
  const roadMesh = nodes.road_1.geometry;
  const buildingsMesh = nodes.buildings_1.geometry;
  const chimneyMesh01 = nodes.chimney01_1.geometry;
  const chimneyMesh02 = nodes.chimney02_1.geometry;
  const chimneyMesh03 = nodes.chimney03_1.geometry;

  return [groundMesh, roadMesh, buildingsMesh, chimneyMesh01, chimneyMesh02, chimneyMesh03,activeBuildings];
}

export default LoadPlantModel;
