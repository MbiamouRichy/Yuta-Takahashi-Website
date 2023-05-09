import * as THREE from "three";
let container, camera, scene, renderer;

let windowHalfX = window.innerWidth;
let windowHalfY = window.innerHeight;
const mode = document.querySelector(".div-mode");
let titles = document.querySelectorAll("#titles");
let slides = document.querySelectorAll(".slide");
let compteur = document.querySelector(".compteur");
let production = document.querySelector(".production");
let period = document.querySelector(".period");
let period_slide = document.querySelectorAll(".period_slide");
let p_slide = document.querySelectorAll(".p_slide");
let btn_left = document.querySelector("#btn-left");
let btn_right = document.querySelector("#btn-right");
let activeSlide = 0;

// slider
btn_left.addEventListener("click", () => {
  activeSlide++;
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  changeSlide();
});
btn_right.addEventListener("click", () => {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }
  changeSlide();
});
function changeSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].className += " active";

  Updatecompteur()
}
// Le compteur de slide
Updatecompteur();
function Updatecompteur() {

  const compte = (activeSlide + 1).toString().padStart(2, '0')
  const compteLength = (slides.length).toString().padStart(2, '0')

  compteur.innerHTML =
  `
    <p>${compte}</p>
    <hr>
    <p>${compteLength}</p> 
  `;

  period.innerText = period_slide[activeSlide].innerText
  production.innerText = p_slide[activeSlide].innerText
}

// Changer chaque lettre du titre en span
titles.forEach((title) => {
  title.innerHTML = title.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="animation-delay: ${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

// Dark mode / Light mode
mode.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  const img = document.querySelector(".div-mode img");
  let attr = "./assets/moon.svg";
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    attr = "./assets/moon.svg";
    img.setAttribute("src", attr);
  } else {
    html.classList.add("dark");
    attr = "./assets/sun.svg";
    img.setAttribute("src", attr);
  }
});

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
  camera.position.z = 20;
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
var loader = new THREE.TextureLoader();
let geometry = new THREE.PlaneGeometry(5, 3, 50, 30);
const material = new THREE.MeshBasicMaterial({
  map: loader.load("./assets/cameroun.png"),
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function onWindowResize() {
  windowHalfX = window.innerWidth;
  windowHalfY = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  if (plane) {
    // Adaptation de l'objet en fonction de l'ecran
    if (document.body.offsetWidth < 720) {
      plane.rotation.set(-0.3, 0, 1.5);
    } else {
      plane.rotation.set(-0.3, 0, 0);
    }
    if (document.body.offsetWidth > 1024) {
      plane.position.x = 1;
    }
    var t = Date.now() * 0.006;

    for (var i = 0; i < geometry.attributes.position.array.length; i += 3) {
      const mouve1 =
        2 * Math.sin(geometry.attributes.position.array[i] * 4 + t);
      const mouve3 =
        0.25 * Math.sin(geometry.attributes.position.array[i + 1] * 5 + t + 2);
      const fixed1 = (geometry.attributes.position.array[i] - 2.5) / 5;
      const fixed2 = (geometry.attributes.position.array[i] + 2.5) / 5;
      geometry.attributes.position.array[i + 2] =
        (mouve1 + mouve3) * fixed1 * fixed2;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.verticesNeedUpdate = true;
  }
  if (camera) {
    if (document.body.offsetWidth < 500) {
      camera.position.set(0, 0, 20);
    } else {
      camera.position.set(0, 0, 15);
    }
  }
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}
