let scene, renderer, camera, sphere, target, texture;
let theta = 0,
  ADD = 0.05;
let url =
  "https://images.unsplash.com/photo-1552288092-76e7d732366c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80";
let createGeo = () => {
  texture = new THREE.TextureLoader().load(url);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);

  let g = new THREE.SphereGeometry(5, 100, 100);
  let m = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(g, m);
  scene.add(sphere);
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
  // camera.position.set(0, 0, 30);
  //create object
  createGeo();
  target = new THREE.Object3D();
  camera.lookAt(target.position);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let n = 0;
let stop = false;
let mainLoop = () => {
  target.position.x = 10 * Math.sin(theta);
  target.position.z = 10 * Math.cos(theta);
  theta += ADD / 10;
  camera.lookAt(target.position);

  if (n > 99) {
    n = 99;
    stop = true;
  }
  texture.repeat.set(100 - n, 100 - n);
  if (Math.random() > 0.9 && !stop) n += 10;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
