let scene, renderer, camera;
let bg;
let createBG = () => {
  let m = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  let g = new THREE.BoxGeometry(5, 5, 100);
  bg = new THREE.Mesh(g, m);
  // bg.position.set(1, 10, -200);
  scene.add(bg);
};
let car,
  tyres = [];

let pMove = 3;
let nMove = pMove * -1;
let rotateTyre = (tyre) => {
  tyre.rotation.x += 0.5;
};
let moveCar = (dir, val) => {
  if (dir == 0) {
    car.position.x += val;
    tyres.forEach((tyre) => {
      tyre.position.x += val;
      rotateTyre(tyre);
    });
  } else {
    car.position.z += val;
    tyres.forEach((tyre) => {
      tyre.position.z += val;
      rotateTyre(tyre);
    });
  }
};
let onKeyPress = (e) => {
  switch (e.keyCode) {
    case 37:
      moveCar(0, nMove);
      break;
    case 39:
      moveCar(0, pMove);
      break;
    case 38: //UP
      moveCar(1, nMove);
      break;
    case 40:
      moveCar(1, pMove);
      break;
    default:
      return;
  }
};
let ty = [
  new THREE.Vector3(1.8, -1.8, 4.8),
  new THREE.Vector3(-1.8, -1.8, 4.8),
  new THREE.Vector3(1.8, -1.8, -4.8),
  new THREE.Vector3(-1.8, -1.8, -4.8),
];
let createTyres = () => {
  for (let i = 0; i < 4; i++) {
    let m = new THREE.MeshPhongMaterial({
      color: 0x1f0f0f,
      emissiveIntensity: 2,
      shininess: 100,
      side: THREE.DoubleSide,
    });
    let g = new THREE.TorusGeometry(0.8, 0.4, 30, 30);
    let base = new THREE.Mesh(g, m);
    base.position.set(ty[i].x, ty[i].y, ty[i].z);
    base.rotation.y = Math.PI / 2;
    scene.add(base);
    tyres.push(base);
  }
};
let createCar = () => {
  let m = new THREE.MeshPhongMaterial({
    color: 0xff5733,
    emissiveIntensity: 2,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  let g = new THREE.BoxGeometry(4, 4, 10);
  car = new THREE.Mesh(g, m);
  scene.add(car);
  createTyres();
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
  camera.position.set(10, 10, 40);
  let light1 = new THREE.DirectionalLight(0xffffff, 2);
  light1.position.set(0, 10, 15);
  scene.add(light1);
  let light2 = new THREE.DirectionalLight(0xffffff, 2);
  light2.position.set(10, 5, 15);
  scene.add(light2);
  let light3 = new THREE.DirectionalLight(0xffffff, 2);
  light3.position.set(-10, 5, 0);
  scene.add(light3);
  // amb;
  // scene.add(new THREE.AmbientLight(0xffffff));
  //create object
  // createBG();

  createCar();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();

document.body.addEventListener("keydown", onKeyPress);
