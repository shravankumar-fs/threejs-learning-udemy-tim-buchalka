let scene, renderer, camera, cube, light, sphere;

function createGeometry() {
  let texture = new THREE.TextureLoader().load(
    "data:image/jpeg;base64,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"
  );
  let g = new THREE.BoxGeometry(4, 4, 4);
  let m = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 });

  cube = new THREE.Mesh(g, m);

  scene.add(cube);
  texture = new THREE.TextureLoader().load(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-w19JKBqaXjWTG2CCgxsO6OCShXOccILP0Nz_igDS9EQZ69SqRBJcSk55bf9uv8c2i4&usqp=CAU"
  );
  g = new THREE.SphereGeometry(80, 100, 100);
  m = new THREE.MeshPhongMaterial({ map: texture, shininess: 10 });

  sphere = new THREE.Mesh(g, m);
  sphere.position.set(5, 10, -100);

  scene.add(sphere);
}
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
  camera.position.set(0, 0, 30);
  //create object
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 25);
  scene.add(light);
  createGeometry();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
  sphere.rotation.z += 0.01;
  sphere.rotation.x += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
