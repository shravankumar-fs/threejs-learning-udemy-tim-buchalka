let scene, renderer, camera;
let light;
let shapes = [];
let theta = 0,
  ch;
let sand =
  "https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80";
let createShape = (pos, r, h) => {
  let texture = new THREE.TextureLoader().load(
    "https://media.istockphoto.com/photos/brick-wall-seamless-texture-beige-stone-pattern-background-picture-id1224390484"
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  let g = new THREE.ConeGeometry(r, h, 4, 100);
  let m = new THREE.MeshLambertMaterial({
    map: texture,
  });

  let shape = new THREE.Mesh(g, m);
  shape.position.set(pos.x, pos.y, pos.z);
  shape.castShadow = true;
  shape.receiveShadow = true;
  scene.add(shape);
  shapes.push(shape);
};

let createBackground = () => {
  //pyramids
  createShape(new THREE.Vector3(0, 0, 0), 10, 16);
  createShape(new THREE.Vector3(10, 0, -20), 10, 16);
  createShape(new THREE.Vector3(30, 0, -30), 10, 16);
  createShape(new THREE.Vector3(-15, 0, -15), 12, 20);
  let texture = new THREE.TextureLoader().load(sand);
  let g = new THREE.BoxGeometry(1000, 1, 1000);
  let m = new THREE.MeshLambertMaterial({
    map: texture,
  });
  let plane = new THREE.Mesh(g, m);
  plane.position.y = -1;
  plane.receiveShadow = true;
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
  camera.position.set(0, 3, 30);
  //create object
  createBackground();

  let l = new THREE.AmbientLight(0x4f5f5f, 1);
  scene.add(l);
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(15, 20, 10);

  scene.add(light);
  light.castShadow = true;

  light.shadow.camera.fov = 150;
  light.shadow.camera.aspect = 1;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 2500;

  light.shadow.bias = 0.0001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 1024;
  ch = new THREE.CameraHelper(light.shadow.camera);
  scene.add(ch);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  light.position.x = 40 * Math.sin(theta);
  // light.position.y = 40 * Math.cos(theta);
  // light.position.z = 40 * Math.cos(theta);

  // camera.position.x = 10 * Math.sin(theta);
  // camera.position.z = 10 * Math.cos(theta);
  // camera.lookAt(new THREE.Vector3(-5, 0, 0));
  theta += 0.005;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
