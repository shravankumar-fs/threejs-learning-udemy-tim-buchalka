import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, camera, renderer, light1;
let cylinder, sphere, plane;
let ADD = 0.01,
  theta = 0;

let createGeometry = function () {
  let geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
  let material = new THREE.MeshPhongMaterial({
    color: 0x448844,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(6, 0, -2);

  geometry = new THREE.SphereGeometry(5, 30, 30);
  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(-5, 5, 2);

  geometry = new THREE.BoxGeometry(2000, 1, 2000);
  material = new THREE.MeshPhongMaterial({
    color: 0xabcdef,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -1;

  scene.add(cylinder);
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
  camera.position.set(0, 10, 40);

  light1 = new THREE.SpotLight(0xffffff, 1);
  light1.position.set(0, 10, 15);

  scene.add(light1);
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  // camera.fov += ADD;
  // camera.updateProjectionMatrix();
  // if (camera.fov > 100 || camera.fov < 50) ADD *= -1;

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.position.x = 70 * Math.sin(theta);
  camera.position.z = 70 * Math.cos(theta);
  theta += ADD;

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
