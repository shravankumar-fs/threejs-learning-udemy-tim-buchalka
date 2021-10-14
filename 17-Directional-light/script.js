import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;

let cube, cone, plane, light, sphere, lightHelper;
let ADD = 0.3;

let createGeometry = function () {
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshPhongMaterial({
    color: 0x0f1d89,
    shininess: 100,
    side: THREE.DoubleSide,
  });

  cube = new THREE.Mesh(geometry, material);
  cube.position.z = -10;
  cube.position.y = -5;
  cube.position.x = -6;

  geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
  cone = new THREE.Mesh(geometry, material);
  cone.position.x = 7;
  cone.position.y = -5;

  geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -100;

  geometry = new THREE.SphereGeometry(1, 30, 30);
  material = new THREE.MeshBasicMaterial({ color: 0xffd700 });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = 10;
  sphere.position.z = 0;
  sphere.position.y = 5;

  scene.add(cube);
  scene.add(cone);
  scene.add(plane);
  scene.add(sphere);
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
  camera.position.z = 20;
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 15, 10);
  scene.add(light);

  // lightHelper = new THREE.DirectionalLightHelper(light, 5, 0x000000);
  // scene.add(lightHelper);
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  light.position.x += ADD;
  sphere.position.x += ADD;
  if (light.position.x > 10 || light.position.x < -20) {
    ADD *= -1;
  }
  // lightHelper.update();
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
