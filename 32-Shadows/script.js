let scene, camera, renderer, cube1, cube2, spotLight, plane;
let ADD = 0.01,
  theta = 0;

let createGeometry = function () {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshPhongMaterial({
    color: 0xdff913,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.set(5, 2, 0);
  cube1.castShadow = true;
  cube1.receiveShadow = true;

  geometry = new THREE.BoxGeometry(5, 6, 4);
  cube2 = new THREE.Mesh(geometry, material);
  cube2.position.set(-5, 2, 0);
  cube2.castShadow = true;
  cube2.receiveShadow = true;

  geometry = new THREE.BoxGeometry(2000, 1, 2000);
  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -1;
  plane.receiveShadow = true;

  scene.add(cube1);
  scene.add(cube2);
  scene.add(plane);
};

// set up the environment -
// initiallize scene, camera, objects and renderer
let init = function () {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.Fog(0x000000);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.set(0, 5, 40);

  // spotLight = new THREE.SpotLight(0xffffff, 1);
  // spotLight.position.set(0, 15, 10);
  // spotLight.angle = Math.PI / 2;
  // spotLight.penumbra = 0.05;
  // spotLight.decay = 10;
  // spotLight.distance = 2000;

  spotLight = new THREE.DirectionalLight(0xffffff, 1);
  spotLight.position.set(15, 15, 70);
  // shadow
  spotLight.castShadow = true;

  spotLight.shadow.camera.fov = 50;
  spotLight.shadow.camera.aspect = 1;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 2500;

  spotLight.shadow.bias = 0.001;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 1024;

  scene.add(spotLight);
  const helper = new THREE.CameraHelper(spotLight.shadow.camera);
  scene.add(helper);

  const helper2 = new THREE.DirectionalLightHelper(spotLight);
  scene.add(helper2);
  createGeometry();

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  document.body.appendChild(renderer.domElement);
};

// main animation loop - calls 50-60 times per second.
let mainLoop = function () {
  spotLight.position.x = 10 * Math.sin(theta);
  spotLight.position.z = 10 * Math.cos(theta);
  theta += ADD;
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();
