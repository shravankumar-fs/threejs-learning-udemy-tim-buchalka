let scene, renderer, camera, shape;

let makeshape = () => {
  //   const points = [];
  //   points.push(new THREE.Vector3(6, 0, 0));
  //   points.push(new THREE.Vector3(0, 6, 0));
  //   points.push(new THREE.Vector3(0, 0, 6));
  //   points.push(new THREE.Vector3(1, 2, -2));

  //   let geometry = new THREE.BufferGeometry().setFromPoints(points);

  //   let material = new THREE.MeshBasicMaterial({
  //     color: 0xffffff,
  //     side: THREE.DoubleSide,
  //   });

  //   shape = new THREE.Mesh(geometry, material);
  //   scene.add(shape);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  let geometry = new THREE.BufferGeometry();
  const points = [
    new THREE.Vector3(0, 0, 6), //c
    new THREE.Vector3(0, 6, 0), //b
    new THREE.Vector3(6, 0, 0), //a

    new THREE.Vector3(6, 0, 0), //a
    new THREE.Vector3(-6, 4, -2), //d
    new THREE.Vector3(0, 0, 6), //c

    new THREE.Vector3(0, 6, 0), //b
    new THREE.Vector3(-6, 4, -2), //d
    new THREE.Vector3(6, 0, 0), //a

    new THREE.Vector3(0, 0, 6), //c
    new THREE.Vector3(-6, 4, -2), //d
    new THREE.Vector3(0, 6, 0), //b
  ];

  geometry.setFromPoints(points);
  geometry.computeVertexNormals();

  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
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
  makeshape();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;
  shape.rotation.z += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
