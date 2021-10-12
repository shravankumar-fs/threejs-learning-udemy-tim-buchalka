let scene, renderer, camera, torus;
let createTorus = () => {
  let geometry = new THREE.TorusGeometry(6, 2, 30, 3, Math.PI);
  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
};
let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x123456);

  //create position of camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 30;

  //create object
  createTorus();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

let mainloop = () => {
  let rot = 0.03;
  torus.rotation.x += rot;

  //   torus.rotation.y += rot;
  //   torus.rotation.z += rot;
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
