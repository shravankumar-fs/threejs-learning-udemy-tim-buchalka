let scene, renderer, camera;
let torus = [],
  sphere;
let ADD = 0.01;
let createTorus = () => {
  let geometry = new THREE.TorusGeometry(8.5, 0.7, 2, 50);
  let material = new THREE.MeshBasicMaterial({ color: 0xeac086 });
  let tor = new THREE.Mesh(geometry, material);
  scene.add(tor);
  torus.push(tor);
  geometry = new THREE.TorusGeometry(6.9, 0.7, 2, 50);
  material = new THREE.MeshBasicMaterial({ color: 0xffad60 });
  tor = new THREE.Mesh(geometry, material);
  scene.add(tor);
  torus.push(tor);
  geometry = new THREE.TorusGeometry(5.1, 0.7, 2, 50);
  material = new THREE.MeshBasicMaterial({ color: 0xffe39f });
  tor = new THREE.Mesh(geometry, material);
  scene.add(tor);
  torus.push(tor);
  torus.forEach((tor) => {
    tor.rotation.y = 0.5;
    tor.rotation.x = 1.7;
  });
};

let createSphere = () => {
  let geometry = new THREE.SphereGeometry(4, 30, 30);
  let material = new THREE.MeshBasicMaterial({ color: 0x8d5524 });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  //create camera and locate
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 30;

  //create object
  createTorus();
  createSphere();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

let mainLoop = () => {
  //   sphere.rotation.x += 0.01;
  //   //   sphere.rotation.y += 0.1;
  //   torus.forEach((tor) => {
  //     tor.rotation.x += 0.01;
  //     // tor.rotation.y += 0.1;
  //   });
  camera.position.y += ADD;
  if (camera.position.y >= 5 || camera.position.y <= -5) {
    ADD *= -1;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
