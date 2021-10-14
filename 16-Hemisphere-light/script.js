import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;
let cube, sphere, plane, light;
let makegeometry = () => {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshPhongMaterial({
    color: 0xdff913,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(5, 0, 0);

  geometry = new THREE.SphereGeometry(5, 30, 30);
  material = new THREE.MeshPhongMaterial({
    color: 0x66cdaa,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(-5, 5, -5);

  geometry = new THREE.BoxGeometry(2000, 1, 2000);
  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -1;

  scene.add(cube);
  scene.add(sphere);
  scene.add(plane);
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
  camera.position.set(0, 10, 20);

  light = new THREE.HemisphereLight(0x00ff00, 0x0000ff);
  scene.add(light);
  //create object
  makegeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let ADD = 0.02;
let mainLoop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
setTimeout(() => {}, 3000);
