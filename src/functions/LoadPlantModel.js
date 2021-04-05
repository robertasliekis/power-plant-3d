import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LoadPlantModel() {
  const { nodes } = useLoader(GLTFLoader, "./models/plant.glb");
  console.log(nodes);

  const groundMesh = nodes.ground_1.geometry;
  const roadMesh = nodes.road_1.geometry;
  const buildingMesh = nodes.building_1.geometry;
  const chimneyMesh01 = nodes.chimney01_1.geometry;
  const chimneyMesh02 = nodes.chimney02_1.geometry;
  const chimneyMesh03 = nodes.chimney03_1.geometry;

  return [groundMesh, roadMesh, buildingMesh, chimneyMesh01, chimneyMesh02, chimneyMesh03];
}

export default LoadPlantModel;
