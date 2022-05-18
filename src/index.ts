import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import "./index.css";

/* VIEWPORT SIZE */

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/* SCENE SETUP */

const scene = new Scene();
const camera = new PerspectiveCamera(60, size.width / size.height);

camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

scene.add(camera);

const box = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
scene.add(box);

/* RENDERER */

const canvas = document.querySelector<HTMLElement>("canvas.webgl");

const renderer = new WebGLRenderer({ canvas, antialias: false });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderLoop: FrameRequestCallback = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop(0);

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
