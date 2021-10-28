let scene, renderer, camera;
let light1, rayCast, mouse;
let spheres = [];
let ADD = 0.01,
  theta = 0;
let RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;
let target;
let createSphere = (pos) => {
  console.log(pos);
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
let onMouseClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;
  target = new THREE.Vector3(mouse.x, mouse.y, 1);

  rayCast.setFromCamera(mouse, camera);

  createSphere(rayCast.ray.at(200, target));
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 40);
  //create object
  light1 = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light1);

  // let light = new THREE.DirectionalLight(0xffffff, 1);
  // light.position.set(0, -10, 10);
  // scene.add(light);
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.set(-1, -1);

  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("click", onMouseClick);
};
let mainLoop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
