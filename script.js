let scene, camera, renderer, cube;

let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xababab);

  //create and locate camera
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 15;
  camera.position.x = 3;
  camera.position.y = 2;

  let axes = new THREE.AxesHelper(5);
  scene.add(axes);
  createCube();

  //create renderer
  renderer = new THREE.WebGLRenderer();

  //create renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let createCube = () => {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00a1cb });
  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
};
let mainLoop = () => {
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();

mainLoop();
