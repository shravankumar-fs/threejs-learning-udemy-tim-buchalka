let scene, renderer, camera;
const LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40;
let particles = [];
let light, light1, light2;
let ADD = 0.2;

let getRandom = (from, to) => {
  return Math.floor((to - from) * Math.random() + from);
};

class Particle {
  constructor() {
    let geometry = new THREE.SphereGeometry(0.5, 30, 30);
    let material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      shininess: 100,
      specular: 0xafeeee,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.x = getRandom(-15, 15);
    this.mesh.position.y = getRandom(-5, 5);
    this.mesh.position.z = getRandom(-10, 10);
    this.radius = Math.abs(this.mesh.position.x);

    this.theta = 0;
    this.dTheta = (2 * Math.PI) / getRandom(150, 200);
    this.yFactor = getRandom(0, Math.PI);
  }

  move() {
    this.mesh.position.x = this.radius * Math.sin(this.theta);
    this.mesh.position.y = this.radius * Math.sin(this.theta + this.yFactor);
    this.mesh.position.z = this.radius * Math.cos(this.theta);
    this.theta += this.dTheta;
  }
}

let createGeometry = () => {
  for (let i = 1; i <= 100; i++) {
    let p = new Particle();
    particles.push(p);
    scene.add(p.mesh);
  }
};
let onKeyDown = (e) => {
  if (e.keyCode == UP) {
    camera.position.z -= ADD;
  } else if (e.keyCode == DOWN) {
    camera.position.z += ADD;
  }
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
  light = new THREE.PointLight(0xffffff, 2, 30, 2);
  light.distance = 200;
  scene.add(light);
  light1 = new THREE.PointLight(0xffffff, 2, 30, 2);

  light.position.y = -20;
  scene.add(light1);
  light1 = new THREE.PointLight(0xffffff, 2, 30, 2);

  light.position.y = 20;
  scene.add(light1);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("keydown", onKeyDown);
};

let mainLoop = () => {
  particles.forEach((p) => p.move());
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
