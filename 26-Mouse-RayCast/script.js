let scene, renderer, camera;
let cube, sphere;
let light1, light2, rayCast, mouse;

let onMouseClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;

  rayCast.setFromCamera(mouse, camera);
};

let createGeometry = () => {
  let g = new THREE.SphereGeometry(5, 30, 30);
  let m = new THREE.MeshPhongMaterial({
    color: 0x0450fb,
    shininess: 100,
    side: THREE.DoubleSide,
  });

  sphere = new THREE.Mesh(g, m);
  scene.add(sphere);
  sphere.position.set(1, 4, -10);
  g = new THREE.BoxGeometry(5, 5, 5);
  m = new THREE.MeshPhongMaterial({
    color: 0xff4500,
    shininess: 100,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });
  cube = new THREE.Mesh(g, m);

  scene.add(cube);
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
  camera.position.z = 30;
  //create object
  createGeometry();
  light1 = new THREE.DirectionalLight(0xffffff, 1);
  light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, -5, 2);
  scene.add(light1);
  scene.add(light2);

  //raycasting
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;

  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  document.addEventListener("click", onMouseClick);
};
let mainLoop = () => {
  sphere.material.color.set(0x0450fb);
  cube.material.color.set(0xff4500);

  let intersects = rayCast.intersectObjects(scene.children);
  intersects.forEach((obj) => {
    obj.object.material.color.set(0x00ff00);
  });

  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
