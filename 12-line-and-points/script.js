import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;
let cylinder, sphere;

let ADD = 0.01;
let createGeometry = () => {
  // let material = new THREE.LineDashedMaterial({
  //   color: 0xffffff,
  //   linewidth: 1,
  //   dashSize: 5,
  //   gapSize: 1,
  // });

  let material = new THREE.PointsMaterial({ color: 0xffffff });
  let geometry = new THREE.CylinderGeometry(3, 2, 4);
  // cylinder = new THREE.Line(geometry, material);
  cylinder = new THREE.Points(geometry, material);
  cylinder.position.z = -10;
  cylinder.position.x = -5;
  // cylinder.computeLineDistances();

  geometry = new THREE.SphereGeometry(3, 15, 15);
  // sphere = new THREE.Line(geometry, material);
  sphere = new THREE.Points(geometry, material);
  sphere.position.z = 0;
  sphere.position.x = 5;
  // sphere.computeLineDistances();
  // geometry.computeLineDistances();

  scene.add(cylinder);
  scene.add(sphere);
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x123456);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 30;
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  cylinder.rotation.x += ADD;
  sphere.rotation.x += ADD;

  cylinder.rotation.y += ADD;
  sphere.rotation.y += ADD;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
