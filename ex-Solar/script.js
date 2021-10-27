let scene, renderer, camera;

let light;

let sun;

let planets = [];

let theta = 0;
let ADD = 0.01;

class Planet {
  constructor(
    width,
    color,
    position,
    ring,
    ringWidth,
    ringSpaceWidth,
    ringColor
  ) {
    this.width = width;
    this.color = color;
    this.position = position;
    this.x = position.x;
    this.z = position.z;
    this.y = position.y;
    this.ring = ring | undefined;
    this.ringWidth = ringWidth;
    this.ringSpaceWidth = ringSpaceWidth;
    this.ringColor = ringColor;

    this.planet = this.initPlanet();
    if (this.ring) {
      this.ring = this.initRing();
    }
  }

  initPlanet() {
    let geo = new THREE.SphereGeometry(this.width, 100, 100);
    let material = new THREE.MeshPhongMaterial({
      color: this.color,
      shininess: 100,
    });
    let p = new THREE.Mesh(geo, material);
    p.position.set(this.position.x, this.position.y, this.position.z);
    return p;
  }
  initRing() {
    let g = new THREE.TorusGeometry(this.ringWidth, this.ringSpaceWidth, 2, 30);
    let m = new THREE.MeshPhongMaterial({
      color: this.ringColor,
      shininess: 100,
    });
    let r = new THREE.Mesh(g, m);
    r.position.set(this.position.x, this.position.y, this.position.z);
    r.rotation.x += Math.PI / 2.5;
    return r;
  }

  getPlanet() {
    return this.planet;
  }

  getRing() {
    return this.ring;
  }
}

let createRandom = () => {
  for (let i = 0; i < 1000; i++) {
    let geo = new THREE.SphereGeometry(
      2,
      4 + ((i * Math.random()) % 4),
      2,
      3,
      6.3,
      3,
      0.8
    );
    let material = new THREE.MeshBasicMaterial(0x123456);
    let p = new THREE.Mesh(geo, material);
    p.position.set(
      Math.random() > 0.5
        ? -800 + 1000 * Math.random()
        : 800 - 1000 * Math.random(),
      Math.random() > 0.5
        ? -800 + 1000 * Math.random()
        : 800 - 1000 * Math.random(),
      Math.random() > 0.5
        ? -800 + 1000 * Math.random()
        : 100 - 1000 * Math.random()
    );
    p.rotation.x += Math.PI / 2;
    scene.add(p);
  }
};
let createSun = () => {
  let geo = new THREE.SphereGeometry(3, 100, 100);
  let material = new THREE.MeshPhongMaterial({
    color: 0xf5e314,
    shininess: 100,
  });
  sun = new THREE.Mesh(geo, material);

  scene.add(sun);

  let light2 = new THREE.DirectionalLight(0xffffff, 2);
  light2.position.set(5, 5, 5);
  light2.target = sun;
  scene.add(light2);

  let light3 = new THREE.DirectionalLight(0xffffff, 2);
  light3.position.set(-5, -5, 5);
  light3.target = sun;
  scene.add(light3);
};

let createMercury = () => {
  let pFac = new Planet(1, 0xfb0d0d, new THREE.Vector3(4, -5, 10));
  scene.add(pFac.getPlanet());
  planets.push(pFac);
};

let createVenus = () => {
  let pFac = new Planet(2, 0xec645d, new THREE.Vector3(-6, -8, -9));
  scene.add(pFac.getPlanet());
  planets.push(pFac);
};

let createEarth = () => {
  let pFac = new Planet(3, 0x3d5dff, new THREE.Vector3(-12, 13, 25));
  scene.add(pFac.getPlanet());
  planets.push(pFac);
};

let createMars = () => {
  let pFac = new Planet(2, 0xdf7a16, new THREE.Vector3(-18, 18, -20));
  scene.add(pFac.getPlanet());
  planets.push(pFac);
};

let createJupiter = () => {
  let pFac = new Planet(
    6,
    0xca5f09,
    new THREE.Vector3(-30, 30, -30),
    true,
    10,
    0.09,
    0xf9c14d
  );
  scene.add(pFac.getPlanet());
  scene.add(pFac.ring);
  planets.push(pFac);
};

let createSaturn = () => {
  let pFac = new Planet(
    5,
    0x1f0909,
    new THREE.Vector3(30, -35, 20),
    true,
    12,
    4,
    0x1f0909
  );
  scene.add(pFac.getPlanet());
  scene.add(pFac.ring);
  planets.push(pFac);
};
let createUranus = () => {
  let pFac = new Planet(
    5,
    0xade1ff,
    new THREE.Vector3(-43, 40, 23),
    true,
    8,
    1,
    0xadf1f2
  );
  scene.add(pFac.getPlanet());
  scene.add(pFac.ring);
  planets.push(pFac);
};

let createNeptune = () => {
  let pFac = new Planet(
    5.8,
    0x1234ff,
    new THREE.Vector3(40, -40, 71),
    true,
    8,
    0.4,
    0x1234ff
  );
  scene.add(pFac.getPlanet());
  scene.add(pFac.ring);
  planets.push(pFac);
};

let createGeometry = () => {
  //
  createSun();
  createMercury();
  createVenus();
  createEarth();
  createMars();
  createJupiter();
  createSaturn();
  createUranus();
  createNeptune();

  createRandom();
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070211);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(5, 10, 60);
  light = new THREE.PointLight(0xffffff, 10, 40, 3);
  light.position.set(0, 0, 0);
  scene.add(light);

  //create object
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  planets.forEach((pl) => {
    let p = pl.getPlanet();
    p.rotation.x += 0.5;
    p.rotation.y += Math.sin(theta);
    p.position.x = pl.x * Math.sin(theta);
    p.position.z = pl.z * Math.cos(theta);
    p.position.y = pl.y * Math.cos(theta);
    if (pl.getRing()) {
      let ring = pl.getRing();
      ring.position.x = pl.x * Math.sin(theta);
      ring.position.z = pl.z * Math.cos(theta);
      ring.position.y = pl.y * Math.cos(theta);
      ring.rotation.z += Math.sin(theta) + 1;
      ring.rotation.y += Math.cos(theta) / 1000;
    }
  });

  theta += ADD;

  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
