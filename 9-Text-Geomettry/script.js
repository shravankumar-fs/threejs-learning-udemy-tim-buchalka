import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { TextGeometry } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/FontLoader";

let scene, renderer, camera, text;
let lyrics =
  "I walk a lonely road\nThe only one that I have ever known\nDon't know where it goes\nBut it's home to me, and I walk alone\nI walk this empty street\nOn the Boulevard of Broken Dreams\nWhere the city sleeps\nAnd I'm the only one, and I walk alone\nI walk alone, I walk alone\nI walk alone, I walk a-\nMy shadow's the only \none that walks beside me\nMy shallow heart's the only\n thing that's beating\nSometimes, I wish someone out there will find me\n'Til then, I walk alone\nAh-ah, ah-ah, ah-ah, ah-ah\nAh-ah, ah-ah, ah-ah";

let loadFont = () => {
  let loader = new FontLoader();
  const font = loader.load(
    "../node_modules/three/examples/fonts/helvetiker_bold.typeface.json",

    // onLoad callback
    function (font) {
      let geometry = new TextGeometry(lyrics, {
        font: font,
        size: 3,
        height: 0.1,
      });
      let material = new THREE.MeshBasicMaterial({ color: 0x034b59 });
      text = new THREE.Mesh(geometry, material);
      text.position.x = -25;
      text.rotation.x = -0.9;
      scene.add(text);
    }
  );
};

let init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  //create camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    150
  );
  camera.position.set(0, 5, 40);

  //create object
  loadFont();
  //create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};
let mainLoop = () => {
  text.position.z -= 0.1;
  text.position.y += 0.05;
  renderer.render(scene, camera);

  requestAnimationFrame(mainLoop);
};

init();
setTimeout(() => {
  mainLoop();
}, 1000);
