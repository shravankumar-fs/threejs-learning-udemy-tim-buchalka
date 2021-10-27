let scene, renderer, camera;
let cube;
let ADD = 0.05;
function createCube() {
  let g = new THREE.BoxGeometry(5, 5, 5);
  let m = new THREE.MeshPhongMaterial({
    color: 0x000fff,
    shininess: 100,
    emissiveIntensity: 10,
  });
  cube = new THREE.Mesh(g, m);
  scene.add(cube);
}
function mouseClick(e) {
  ADD *= -1;

  let x = e.clientX;
  let y = e.clientY;

  console.log(x, y);
}
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 30;
  //create object
  createCube();
  //create light
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 40);

  scene.add(light);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  document.addEventListener("click", mouseClick);
};
let mainLoop = () => {
  cube.rotation.x += ADD;
  cube.rotation.z += ADD;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
