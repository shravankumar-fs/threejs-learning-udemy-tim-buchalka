let scene, camera, renderer, sphere;

let ADD = 0.01;

let createSphere = () => {
  let geometry = new THREE.SphereGeometry(
    5,
    30,
    30,
    0,
    Math.PI,
    0,
    Math.PI / 2
  );
  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

let init = () => {
  //create Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  //create camera and locate
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 30;
  //create object
  createSphere();
  //render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

let mainloop = () => {
  sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.01;
  // sphere.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(mainloop);
};

init();
mainloop();
