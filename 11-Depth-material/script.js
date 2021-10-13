import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera, cube, sphere;
let ADD = 0.01;
let createShapes = () => {
  let material = new THREE.MeshDepthMaterial();

  let cubeGeo = new THREE.BoxGeometry(3, 2, 4);
  cube = new THREE.Mesh(cubeGeo, material);
  cube.position.z = -5;
  cube.position.x = -5;

  //sphere
  let sphereGeo = new THREE.SphereGeometry(3, 30, 30);
  sphere = new THREE.Mesh(sphereGeo, material);
  sphere.position.z = 5;
  sphere.position.x = 5;
  scene.add(sphere);
  scene.add(cube);
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff000f);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 15;
  //create object
  createShapes();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  cube.position.z += ADD;
  sphere.position.z -= ADD;
  if (cube.position.z > 6 || cube.position.z < -6) {
    ADD *= -1;
  }
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
setTimeout(() => {
  mainLoop();
}, 100);
