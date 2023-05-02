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

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
  windowHalfX = window.innerWidth;
  windowHalfY = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  if (plane) {
    var t = Date.now() * 0.006;

    for (var i = 0; i < geometry.attributes.position.array.length; i += 3) {
      const mouve1 =
        2 * Math.sin(geometry.attributes.position.array[i] * 4 + t * 1.5);
      const mouve3 =
        0.25 * Math.sin(geometry.attributes.position.array[i + 1] * 5 + t + 2);
      const fixed1 = (geometry.attributes.position.array[i] - 2.5) / 5
      const fixed2 = (geometry.attributes.position.array[i] + 2.5) / 5
      geometry.attributes.position.array[i + 2] = (i, mouve1 + mouve3) * fixed1 * fixed2;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.verticesNeedUpdate = true;
  }
  if(camera) {
    if (document.body.offsetWidth < 768 && document.body.offsetWidth > 400) {
      camera.position.set(0, 0, 25);
    } else if (document.body.offsetWidth < 400) {
      camera.position.set(0, 0, 30);
    }else{
      camera.position.set(0, 0, 15);
    }
  
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
