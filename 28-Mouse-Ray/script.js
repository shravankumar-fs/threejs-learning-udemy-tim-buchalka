let scene, renderer, camera;
let light1, rayCast, mouse;
let spheres = [];
let ADD = 0.01,
  theta = 0;
let RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;
let createSphere = (pos) => {
  let m = new THREE.MeshPhongMaterial({
    color: 0x4a57fa,
    side: THREE.DoubleSide,
    shininess: 100,
  });
  let g = new THREE.SphereGeometry(RADIUS, 30, 30);
  let sphere = new THREE.Mesh(g, m);
  sphere.position.set(pos.x, pos.y, pos.z);
  scene.add(sphere);
};

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

  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
