import * as THREE from "https://cdn.skypack.dev/three@0.133.1";

let scene, renderer, camera;
let cubes = [],
  light1,
  light2,
  target1,
  target2,
  plane;
let ADD = 0.2;
let randomInRange = (min, max) => {
  let x = Math.random() * (max - min);
  return Math.floor(min + x);
};

let createCube = () => {
  let w = randomInRange(5, 8);
  let h = randomInRange(5, 8);
  let d = randomInRange(5, 8);

  let geometry = new THREE.BoxGeometry(w, h, d);
  let material = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff,
    shininess: 100,
  });

  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = randomInRange(-30, 30);
  cube.position.z = randomInRange(-20, 20);

  cubes.push(cube);
};

let createGeometry = () => {
  let geometry = new THREE.BoxGeometry(2000, 1, 2000);
  let material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -1;
  for (let i = 0; i <= 10; i++) {
    createCube();
  }
  cubes.forEach((cube) => scene.add(cube));
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
  camera.position.set(0, 10, 30);
  // let light = new Spot();

  light1 = new THREE.SpotLight(0xffffff, 3);
  scene.add(light1);
  light1.position.set(15, 20, 10);
  light1.angle = Math.PI / 20;
  light1.penumbra = 0.05;
  light1.decay = 2;
  light1.distance = 200;

  target1 = new THREE.Object3D();
  target1.position.set(20, 0, 0);
  light1.target = target1;

  scene.add(target1);

  light1 = new THREE.SpotLight(0xffffff, 3);
  scene.add(light1);
  light2 = new THREE.SpotLight(0xffffff, 1);
  light2.position.set(-15, 20, 10);
  light2.angle = Math.PI / 20;
  light2.penumbra = 0.05;
  light2.decay = 2;
  light2.distance = 200;
  scene.add(light2);

  target2 = new THREE.Object3D();
  target2.position.set(-10, 0, 0);
  light2.target = target2;

  scene.add(target2);
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  // light1.position.x += ADD;
  // light2.position.x -= ADD;
  // if (light1.position.x < -20 || light1.position.x > 20) ADD *= -1;

  target1.position.x -= ADD;
  target2.position.x += ADD;
  if (target1.position.x < -20 || target1.position.x > 20) ADD *= -1;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
