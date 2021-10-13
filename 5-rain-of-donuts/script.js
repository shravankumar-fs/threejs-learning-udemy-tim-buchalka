let scene, camera, renderer;

let ADD = 0.1;
let donuts = [];

let randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return Math.floor(x + from);
};
let createDonuts = () => {
  let geometry = new THREE.TorusGeometry(1, 0.5, 5, 30);
  let material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  let d = new THREE.Mesh(geometry, material);
  d.position.x = randomInRange(-15, 15);
  d.position.z = randomInRange(-15, 15);
  d.position.y = 15;
  scene.add(d);
  donuts.push(d);
};
let init = () => {
  //create Scene
  scene = new THREE.Scene();
  scene.background == new THREE.Color(0x000000);

  //create Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 30;
  //create Object

  //create Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

let mainloop = () => {
  if (Math.random() < 0.1) createDonuts();
  donuts.forEach((d) => (d.position.y -= ADD));
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
