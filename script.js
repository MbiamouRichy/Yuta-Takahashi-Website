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

  document.addEventListener("mousemove", onDocumentMouseMove);
  window.addEventListener("resize", onWindowResize);
}

const geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  wireframe: true,
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.z = 5;
plane.rotation.x = -0.1;

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 5;
  mouseY = (event.clientY - windowHalfY) / 5;
}

function animate() {
  // t += 0.05;
  if (plane) {
    var t = Date.now() * 0.006;

    for (var i = 0; i < geometry.attributes.position.array.length; i += 3) {
      const mouve1 =
        0.5 * Math.sin(geometry.attributes.position.array[i] * 2 + t);
      const mouve2 =
        0.25 * Math.sin(geometry.attributes.position.array[i + 1] * 3 + t + 2);
      const mouve3 =
        0.5 * Math.sin(geometry.attributes.position.array[i + 2] * 5 + t + 0.5);

      geometry.attributes.position.array[i + 2] = (i, mouve1 + mouve2);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.verticesNeedUpdate = true;
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
