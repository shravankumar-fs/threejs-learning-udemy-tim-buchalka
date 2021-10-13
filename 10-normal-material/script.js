import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { VertexNormalsHelper } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/helpers/VertexNormalsHelper";

let scene, renderer, camera, cube1, cube2, plane, helper;
let ADD = 0.02;

let createGeometry = () => {
  //cube 1
  let geometry = new THREE.BoxGeometry(5, 5, 5);
  let material = new THREE.MeshBasicMaterial({
    color: 0xc9b92b,
    wireframe: true,
  });

  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.z = -6;
  cube1.position.y = -5;
  helper = new VertexNormalsHelper(cube1, 5, 0x000000, 300);

  scene.add(helper);
  //cube 2
  geometry = new THREE.BoxGeometry(5, 5, 5);
  material = new THREE.MeshBasicMaterial({
    color: 0xff0040,
    transparent: true,
    opacity: 0.8,
  });

  cube2 = new THREE.Mesh(geometry, material);
  cube2.position.z = 6;
  cube2.position.y = -5;

  //plane
  geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
  material = new THREE.MeshBasicMaterial({ color: 0xa6f995, wireframe: true });

  plane = new THREE.Mesh(geometry, material);

  plane.rotation.x = Math.PI / 2;
  plane.position.y = -100;
  // scene.add(cube2);
  scene.add(cube1);
  // scene.add(plane);
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
  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  // cube1.position.x += ADD;
  // cube2.position.x -= ADD;
  // cube1.rotation.x += ADD;
  // console.log(cube1.position);
  // if (cube1.position.x > 6 || cube1.position.x < -6) ADD *= -1;
  cube1.rotation.x += ADD;
  helper.update();
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
