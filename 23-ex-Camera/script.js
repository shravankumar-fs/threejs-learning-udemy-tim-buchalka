import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, camera, renderer, light1;
let sphere;
let ADD = 0.01,
  theta = 0;
const RADIUS = 4,
  BASE_X = -15,
  BASE_Y = -15;
let createGeometry = () => {
  let material = new THREE.MeshPhongMaterial({
    color: 0x0450fb,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
      let sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = BASE_X + j * 2 * (RADIUS + 0.5);
      sphere.position.z = -2 * RADIUS * i;
      sphere.position.y = BASE_Y + i * RADIUS;
      scene.add(sphere);
    }

  let geometry = new THREE.SphereGeometry(2, 30, 30);
  material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(geometry, material);

  sphere.position.y = 100;

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
  camera.position.z = 70;
  let light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);
  let light2 = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light2);
  light2.position.set(60, -400, 80);

  //create object
  createGeometry();
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

setInterval(() => {
  camera.lookAt(sphere.position);
  let yMovement = 20 * Math.sin(theta);
  let zMovement = 20 * Math.cos(theta);
  sphere.position.y = yMovement;
  sphere.position.z = zMovement;
  camera.position.y = yMovement;
  camera.position.z = zMovement + 5;

  theta += ADD;
}, 5);
