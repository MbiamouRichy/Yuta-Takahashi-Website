import * as THREE from "three";
let container, camera, scene, renderer, titles, slides;

let windowHalfX = window.innerWidth;
let windowHalfY = window.innerHeight;
const mode = document.querySelector(".div-mode");
let slider = document.querySelector(".slides");
let compteur = document.querySelector(".compteur");
let production = document.querySelector(".production");
let view_website = document.querySelector(".view-website");
let period = document.querySelector(".period");
let souris = document.querySelector(".souris");
let survol = document.querySelector(".survol");
let load = document.querySelector(".load");
let load_div = document.querySelector(".load_div");
let count = 0;
let load_opacity = document.querySelector(".load_opacity");
let load_svg = document.querySelector(".load_opacity svg");
let detail = document.querySelector(".detail");
let btn_left = document.querySelector("#btn-left");
let btn_right = document.querySelector("#btn-right");
let activeSlide = 0;
let slideEl = [
  {
    title: "Shoe-ThreeJS",
    subTitle: "Landing Page",
    production: 2023,
    period: 4,
    detail: "https://github.com/MbiamouRichy/Shoe-Threejs",
    link: "https://shoe-threejs.vercel.app/",
  },
  {
    title: "Partytrick",
    subTitle: "Landing Page",
    production: 2023,
    period: 2,
    detail: "https://github.com/MbiamouRichy/partytrick",
    link: "https://partytrick-iota.vercel.app/",
  },
  {
    title: "Burger King",
    subTitle: "Landing Page",
    production: 2024,
    period: 1,
    detail: "https://github.com/MbiamouRichy/Burger-App",
    link: "https://burger-app-khaki.vercel.app/",
  },
  {
    title: "Untitle UI",
    subTitle: "Login Page",
    production: 2023,
    period: 4,
    detail: "https://github.com/MbiamouRichy/UntitleUI-login-Page",
    link: "https://untitle-ui-login-page.vercel.app/",
  },
  {
    title: "Grow",
    subTitle: "Website",
    production: 2023,
    period: 3,
    detail: "https://github.com/MbiamouRichy/Growly",
    link: "https://growly-lovat.vercel.app/",
  },
  {
    title: "Keycode",
    subTitle: "Landing Page",
    production: 2023,
    period: 5,
    detail: "https://github.com/MbiamouRichy/Toptal-Keycode",
    link: "https://toptal-keycode.vercel.app/",
  },
];
// slider
creeSlide();
function creeSlide() {
  slideEl.forEach((slide, idx) => {
    const slideChild = document.createElement("div");
    slideChild.className = `${idx == 0 ? "slide active" : "slide"}`;
    const h1 = document.createElement("h1");
    h1.className = "title";
    h1.innerText = `${slide.title}`;
    slideChild.appendChild(h1);
    const div_hr = document.createElement("div");
    div_hr.className = "slider-hr";
    slideChild.appendChild(div_hr);
    const p = document.createElement("p");
    p.className = "subTitle";
    p.innerText = `${slide.subTitle}`;
    slideChild.appendChild(p);
    slider.appendChild(slideChild);
  });

  titles = document.querySelectorAll(".title");
  slides = document.querySelectorAll(".slide");
}
// Navigation du slide
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

document.addEventListener("mousewheel", (event) => {
  // Récupérons la valeur de la rotation de la souris
  const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  // Déterminons la direction de la rotation
  const direction = delta > 0 ? "avancer" : "reculer";

  if (direction === "avancer") {
    activeSlide++;
    if (activeSlide > slides.length - 1) {
      activeSlide = 0;
    }
    changeSlide();
  } else if (direction === "reculer") {
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = slides.length - 1;
    }
    changeSlide();
  }

  // Empêchons le comportement par défaut de la roulette de la souris
  event.preventDefault();
});

function changeSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].className += " active";

  Updatecompteur();
}
// Le compteur de slide
Updatecompteur();
function Updatecompteur() {
  const compte = (activeSlide + 1).toString().padStart(2, "0");
  const compteLength = slides.length.toString().padStart(2, "0");

  compteur.innerHTML = `
    <p>${compte}</p>
    <hr>
    <p>${compteLength}</p> 
  `;

  period.innerText = slideEl[activeSlide].period.toString().padStart(2, "0");
  production.innerText = slideEl[activeSlide].production;
  view_website.setAttribute("href", slideEl[activeSlide].link);
  detail.setAttribute("href", slideEl[activeSlide].detail);
}

// Div qui suit la souris
document.addEventListener("mousemove", (e) => {
  const element = e.target;
  if (
    element.parentNode.classList.contains("title") ||
    element.parentNode.classList.contains("slide") ||
    element.parentNode.classList.contains("detail")
  ) {
    souris.style.borderWidth = "0";
    souris.style.zIndex = "40";
    souris.innerHTML = survol.innerHTML;
    souris.style.top = `${e.pageY - 40}px`;
    souris.style.left = `${e.pageX - 40}px`;
  } else {
    souris.innerHTML = " ";
    souris.style.borderWidth = "1px";
    souris.style.zIndex = "30";
    souris.style.top = `${e.pageY - 20}px`;
    souris.style.left = `${e.pageX - 20}px`;
  }
});

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

// Loader
let set = setInterval(() => {
  count++;
  load.innerText = `${count.toString().padStart(2, "0")}`;
  load_div.style.opacity = scale(count, 0, 100, 1, 0);
  load_svg.style.opacity = scale(count, 0, 100, 0, 1);
  if (count > 99) {
    clearInterval(set);
    load_opacity.style.display = "none";
  }
}, 1);

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
