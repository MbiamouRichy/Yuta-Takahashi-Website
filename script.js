import * as THREE from "three";
let container, camera, scene, renderer, time;

let mouseX = 0,
  mouseY = 0;

let t;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

/*-------------- Genere ma scene threejs --------------------*/

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 15;
  // scene
  scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Point lumineux dans la scene
  const pointLight = new THREE.PointLight(0xcccccc, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}
var loader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
const material = new THREE.MeshBasicMaterial({
  map: loader.load("./assets/cameroun.png")
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.z = 5;
plane.rotation.x = -0.2;

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}

function animate() {
  if (plane) {
    var t = Date.now() * 0.003;

    for (var i = 0; i < geometry.attributes.position.array.length; i += 3) {
      const mouve1 =
        0.5 * Math.sin(geometry.attributes.position.array[i] * 2 + t);
      const mouve2 =
        0.25 * Math.sin(geometry.attributes.position.array[i + 1] * 3 + t + 2);

      geometry.attributes.position.array[i + 2] = (i, mouve1 + mouve2);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.verticesNeedUpdate = true;
  }
  if(camera) {
    if(document.body.offsetWidth)
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
