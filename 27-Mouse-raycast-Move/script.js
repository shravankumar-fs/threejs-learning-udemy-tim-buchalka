let scene, camera, renderer, light1, rayCast, mouse;
let spheres = [];
let ADD = 0.01,
  theta = 0;
const RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;
let onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  rayCast.setFromCamera(mouse, camera);

  let intersects = rayCast.intersectObjects(scene.children);

  intersects.forEach((ob) => {
    ob.object.position.y += 10;
    setTimeout(() => {
      ob.object.position.y -= 10;
    }, 500);
  });
};

let createSphere = (pos) => {
  let m = new THREE.MeshPhongMaterial({
    color: 0x4a57fa,
    side: THREE.DoubleSide,
    shininess: 100,
  });
  let g = new THREE.SphereGeometry(RADIUS, 30, 30);
  let sphere = new THREE.Mesh(g, m);
  sphere.position.set(pos.x, pos.y, pos.z);
  scene.add(sphere);
};

let createGeometry = () => {
  let m = new THREE.MeshPhongMaterial({
    color: 0x0450fb,
    side: THREE.DoubleSide,
    shininess: 100,
    transparent: true,
    opacity: 0.7,
  });
  let g = new THREE.SphereGeometry(RADIUS, 30, 30);

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let sphere = new THREE.Mesh(g, m);
      sphere.position.x = BASE_X + j * 2 * (RADIUS + 0.5);
      sphere.position.z = -2 * RADIUS * i;
      sphere.position.y = BASE_Y + i * RADIUS;
      scene.add(sphere);
    }
  }
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 40);

  //create geometry
  light1 = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(light1);

  createGeometry();

  //create raycaster
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("mousemove", onMouseMove, false);
};
let mainLoop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
