import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;
let cube, cone, plane, light;
let makegeometry = () => {
  let material = new THREE.MeshPhongMaterial({
    color: 0x0f1d89,
    side: THREE.DoubleSide,
    shininess: 100,
  });
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -6;
  cube.position.y = -5;
  cube.position.z = -6;
  geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
  cone = new THREE.Mesh(geometry, material);
  cone.position.x = 7;
  cone.position.y = -5;

  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -100;
  plane.rotation.x = Math.PI / 2;

  scene.add(cube);
  scene.add(cone);
  scene.add(plane);
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
  camera.position.z = 30;
  light = new THREE.AmbientLight(0xffffff);
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
  light.intensity += ADD;
  if (light.intensity >= 8 || light.intensity <= 1) {
    ADD *= -1;
  }
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
setTimeout(() => {}, 3000);
