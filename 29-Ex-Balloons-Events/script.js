let scene, renderer, camera;
let list = [];
let ADD = 0.2;
let rayCast, mouse;

function onMouseClick(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  rayCast.setFromCamera(mouse, camera);

  rayCast.intersectObjects(scene.children).forEach((obj) => {
    obj.object.position.x = window.innerWidth * 100;
    obj.object.position.y = window.innerHeight * 100;
    console.log(obj.object.position);
  });
}
function getRandom(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}

function createBalloon(i) {
  let m = new THREE.MeshPhongMaterial({
    color: 0xffffff * Math.random(),
    shininess: 200,
    side: THREE.DoubleSide,
  });
  let g = new THREE.SphereGeometry(5, 30, 30);
  let sphere = new THREE.Mesh(g, m);
  sphere.position.x = -40 + i * 16;
  sphere.position.y = -20;
  sphere.position.z = getRandom(-10, 30);
  list.push(sphere);
  scene.add(sphere);
}
function createGeometry() {
  for (let i = 0; i < 5; i++) {
    createBalloon(i);
  }
}
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
  camera.position.z = 80;
  //create object
  let light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);

  let light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0, 10, 80);
  scene.add(light1);

  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.set(-1, -1);
  // createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("click", onMouseClick);
};
let mainLoop = () => {
  list.forEach((sphere) => {
    sphere.position.y += ADD;
  });
  if (Math.random() < 0.008) createGeometry();
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
