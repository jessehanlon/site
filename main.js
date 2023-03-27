import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') 
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(-5, 10, 30);

renderer.render(scene, camera);

let boat;

var loader = new GLTFLoader();

loader.load('./opti.glb', (gltf) => {
  boat = gltf.scene.children[0];
  boat.translateZ(0.4);
  boat.castShadow = true;
  scene.add(boat);
  //scene.add(gltf.scene);
  console.log(boat)
  
animate();

});


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 15, 15);
pointLight.castShadow = true;
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

renderer.setClearColor(0x9fd2f1, 1.0); // sky color
renderer.shadowMapEnbled = true;

var waterGeometry = new THREE.PlaneGeometry(1000, 500);
var waterMaterial = new THREE.MeshLambertMaterial({color: 0x1acffa}); // water color
var water = new THREE.Mesh(waterGeometry, waterMaterial);
water.recieveShadow = true;
water.rotateX(-Math.PI / 2);
scene.add(water);



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  boat.translateY(0.07);  //set 0.07
  window.console.log(boat.position);
  if((boat.position.z < -30) || (boat.position.z > 0))  {
  
    boat.rotation.z += 0.012;
  }
}

