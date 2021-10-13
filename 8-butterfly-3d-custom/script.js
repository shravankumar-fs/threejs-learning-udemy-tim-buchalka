let scene,
  renderer,
  camera,
  shapes = [],
  shape;
// let dpos = 0.01,
//   dneg = 0.01;
let ADD = 0.1;
let createButterfly = () => {
  let points = [
    new THREE.Vector3(0, 0, 0), //a
    new THREE.Vector3(5, 0, 0), //b
    new THREE.Vector3(2, 4, 3), //c

    new THREE.Vector3(0, 0, 0), //a
    new THREE.Vector3(5, 0, 0), //b
    new THREE.Vector3(2, 4, -3), //d
  ];

  let geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.computeVertexNormals();

  let material = new THREE.MeshBasicMaterial({
    color: 0x8f260f,
    side: THREE.DoubleSide,
  });
  shape = new THREE.Mesh(geometry, material);
  shape.rotation.z = 0.7;
  shape.rotation.x = 0.6;
  scene.add(shape);

  // points = [
  //   new THREE.Vector3(0, 0, 0), //a
  //   new THREE.Vector3(5, 0, 0), //b
  //   new THREE.Vector3(2, 4, -3), //d
  // ];
  // geometry = new THREE.BufferGeometry().setFromPoints(points);
  // geometry.computeVertexNormals();
  // shape = new THREE.Mesh(geometry, material);
  // scene.add(shape);
  // shapes.push(shape);

  // shapes[0].rotation.z = 0.7;
  // shapes[1].rotation.x = 0.6;
};
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
  camera.position.z = 30;
  // camera.position.x = 20;

  //create object
  createButterfly();
  axes = new THREE.AxesHelper(20);
  scene.add(axes);
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  // shapes.forEach((shape) => {
  //   let z = shape.geometry.attributes.position.getZ(2);
  //   if (z < 0) {
  //     if (z <= -10) {
  //       dneg = 0.01;
  //     } else if (z >= -7) {
  //       dneg = -0.01;
  //     }
  //     z = z + dneg;
  //   } else {
  //     if (z >= 10) {
  //       dpos = -0.01;
  //     } else if (z <= 7) {
  //       dpos = 0.01;
  //     }
  //     z = z + dpos;
  //   }
  //   shape.geometry.attributes.position.setZ(2, z);
  //   shape.geometry.attributes.position.needsUpdate = true;
  // });

  let y = +shape.geometry.attributes.position.getY(2);
  y += ADD;
  shape.geometry.attributes.position.setY(2, y);
  shape.geometry.attributes.position.setY(5, y);
  shape.geometry.attributes.position.needsUpdate = true;

  if (y <= -5 || y >= 5) {
    ADD *= -1;
  }
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
