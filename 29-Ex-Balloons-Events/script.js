let scene, renderer, camera;
let list = [];
let rayCast, mouse;

function onMouseClick(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  rayCast.setFromCamera(mouse, camera);

  let intersects = rayCast.intersectObjects(scene.children);
  if (intersects.length == 0) return;
  let hit = intersects[0].object;

  list.forEach((item, idx) => {
    if (item.object == hit) {
      list.splice(idx, 1);
      scene.remove(hit);
    }
  });
  // intersects.forEach((item) => {
  //   list.forEach((balloon, idx) => {
  //     if (balloon.object == item.object) {
  //       list.splice(idx, 1);
  //       scene.remove(balloon.object);
  //     }
  //   });
  // });
}
function getRandom(start, end) {
  return start + Math.floor(Math.random() * (end - start));
}

class Balloon {
  constructor() {
    console.log("Hellow");
    let m = new THREE.MeshPhongMaterial({
      color: 0xffffff * Math.random(),
      shininess: 200,
      side: THREE.DoubleSide,
    });
    let g = new THREE.SphereGeometry(3, 30, 30);
    let sphere = new THREE.Mesh(g, m);
    sphere.position.x = getRandom(-40, 40);
    sphere.position.y = -20;
    sphere.position.z = getRandom(-10, 30);
    this.object = sphere;
    console.log(this.object);
    scene.add(sphere);

    this.ADD = getRandom(0.05, 0.15);
    this.over = false;
    this.top = 50;
  }
  advance() {
    this.object.position.y += this.ADD;
    if (this.object.position.y > this.top) {
      this.over = true;
    }
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
  list.push(new Balloon());
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("click", onMouseClick);
};
let mainLoop = () => {
  if (Math.random() < 0.05) {
    list.push(new Balloon());
  }

  list.forEach((balloon, idx) => {
    balloon.advance();
    if (balloon.over) {
      list.splice(idx, 1);
      scene.remove(balloon);
    }
  });

  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
