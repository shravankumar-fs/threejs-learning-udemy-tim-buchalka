import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;
let cube, sphere, cone;
let ADD = 0.02;

let createGeometry = () => {
  // let material = new THREE.MeshLambertMaterial({
  //   side: THREE.DoubleSide,
  //   color: 0x7fc5f9,
  //   emissive: 0x25673d,
  //   emissiveIntensity: 0.5,
  // });

  // let material = new THREE.MeshPhongMaterial({
  //   side: THREE.DoubleSide,
  //   color: 0x7fc5f9,
  //   emissive: 0x25673d,
  //   emissiveIntensity: 0.5,
  //   shininess: 1000,
  //   specular: 0x9d0a00,
  // });

  let material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: 0x7fc5f9,
    emissive: 0x25673d,
    emissiveIntensity: 0.4,
    metalness: 1,
    roughness: 1,
  });

  let geometry = new THREE.BoxGeometry(3, 3, 3);
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -6;

  geometry = new THREE.SphereGeometry(3, 30, 30);
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = 0;

  geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
  cone = new THREE.Mesh(geometry, material);
  cone.position.x = 7;

  scene.add(cube);
  scene.add(sphere);
  scene.add(cone);
};

let init = () => {
  //create scene
  scene = new THREE.Scene();
  let black = true;
  setInterval(() => {
    if (!black) {
      scene.background = new THREE.Color(0xffffff);
    } else {
      scene.background = new THREE.Color(0x000000);
    }
    black = !black;
  }, 5000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 20;
  let directionalLightup = new THREE.DirectionalLight(0xffffff);
  scene.add(directionalLightup);
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  cube.rotation.x += ADD;
  cube.rotation.y += ADD;

  sphere.rotation.x += ADD;
  sphere.rotation.y += ADD;

  cone.rotation.x += ADD;
  cone.rotation.y += ADD;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
setTimeout(() => {
  mainLoop();
}, 5000);
