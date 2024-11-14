import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import gsap from "gsap";

import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 3.5;

// Load HDRI environment map
new RGBELoader().load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pond_bridge_night_1k.hdr",
  function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    texture.dispose();
    pmremGenerator.dispose();
    scene.environment = envMap;
    // scene.background = envMap;

    const loader = new GLTFLoader();
    loader.load(
      "./DamagedHelmet.gltf",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error);
      }
    );
  }
);

window.addEventListener("mousemove", (e) => {
  if (model) {
    const rotationX = (e.clientX / window.innerWidth - 0.5) * (Math.PI * .4);
    const rotationY = -(e.clientY/window.innerHeight - 0.5) * (Math.PI * .4);
    gsap.to(model.rotation, {
      y: rotationX,
      x: rotationY,
      duration: 0.9,
      ease: "power2.out"
    });
  }
});

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

let model;

// Post processing setup
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms["amount"].value = 0.003;
composer.addPass(rgbShiftPass);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  window.requestAnimationFrame(animate);
  composer.render();
  // controls.update();
}
animate();
