let scene, renderer, camera, light;
const LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40;
let cubes = [];
let ADD = 0.2;

let randomInRange = (min, max) => {
  let x = Math.random() * (max + 1 - min);
  return Math.floor(x + min);
};

let createCube = () => {
  let m = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  let w = randomInRange(1, 3);
  let h = randomInRange(1, 3);
  let d = randomInRange(1, 3);
  let g = new THREE.BoxGeometry(w, h, d);

  let cube = new THREE.Mesh(g, m);
  cube.position.x = randomInRange(-30, 30);
  cube.position.z = randomInRange(-140, 30);
  return cube;
};

function createGeometry() {
  for (let i = 0; i < 150; i++) {
    let cube = createCube();
    cubes.push(cube);
    scene.add(cube);
  }
}
let onKeyPress = (e) => {
  if (e.keyCode == LEFT) camera.position.x -= 0.2;
  else if (e.keyCode == RIGHT) camera.position.x += 0.2;
  else if (e.keyCode == UP) camera.position.y += 0.2;
  else if (e.keyCode == DOWN) camera.position.y -= 0.2;
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0fff);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 5, 100);

  //create object
  createGeometry();
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 15, 10);
  scene.add(light);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  camera.position.z -= 0.2;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
document.body.addEventListener("keydown", onKeyPress);
