import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera, light1;
const RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;
let theta = 0;
let ADD = 0.02;
let spheres = [];
let createGeometry = () => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let g = new THREE.SphereGeometry(RADIUS, 30, 30);
      let m = new THREE.MeshPhongMaterial({
        color: 0x123456,
        shininess: 100,
        side: THREE.DoubleSide,
      });

      let sphere = new THREE.Mesh(g, m);
      sphere.position.x = BASE_X + j * 2 * (RADIUS + 0.5);
      sphere.position.z = -2 * RADIUS * i;
      sphere.position.y = BASE_Y + i * RADIUS;
      scene.add(sphere);
    }
  }
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);

  //create camera
  // camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   1,
  //   1000
  // );
  // camera.position.set(0, 0, 40);

  camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000);
  camera.zoom = 5;
  camera.updateProjectionMatrix();

  light1 = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(light1);
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.position.x = 40 * Math.sin(theta);
  camera.position.z = 40 * Math.cos(theta);
  theta += ADD;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();

// let interval = setInterval(() => {
//   if (camera instanceof THREE.PerspectiveCamera) {
//     camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000);
//     camera.zoom = 5;
//     camera.updateProjectionMatrix();
//     clearInterval(interval);
//   } else {
//     camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       1,
//       1000
//     );
//     camera.position.set(0, 0, 40);
//   }
// }, 5000);
