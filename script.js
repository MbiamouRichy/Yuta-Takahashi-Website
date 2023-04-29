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

const geometry = new THREE.PlaneGeometry(5, 3, 15, 9);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  wireframe: true,
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.z = 5;

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

let count;
count = geometry.attributes.position.count;
let mouve1, mouve2, x
function animate() {
  t += 0.05;
  if (plane) {
    // plane.geometry.vertices.forEach( v => {
    //     const mouve1 = 0.5 * Math.sin(v.x * 2 + t);
    //     const mouve2 = 0.25 * Math.sin(v.x * 3 + t + 2);
    //     const mouve3 = 0.5 * Math.sin(v.y * 5 + t + 0.5);
    //     v.z = mouve1 + mouve2 + mouve3;
    // })
    for (let i = 0; i < count; i++) {
         x = parseFloat(geometry.attributes.position.getX(i));
    //   const y = geometry.attributes.position.getX(i);

      // const mouve1 = 0.5 * Math.sin(x * 2 + t);
      // const mouve2 = 0.5 * Math.sin(x * 2 + t);
      // geometry.attributes.position.setZ(i, mouve1)
      // Vérifier si les coordonnées sont valides
        // x = parseFloat(x);
        // y = parseFloat(y);

      // Vérifier à nouveau si les coordonnées sont valides après la conversion
         mouve1 = 0.5 * Math.sin(x * 2 + t);
        //  mouve2 = 0.5 * Math.sin(y * 2 + t);

        geometry.attributes.position.setZ(i, mouve1);

      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();
    }
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
