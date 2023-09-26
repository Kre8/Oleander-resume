console.clear();
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('')
const canvas = document.querySelector('canvas.webgl')
THREE.ShaderChunk.shadowmap_pars_fragment = THREE.ShaderChunk.shadowmap_pars_fragment.replace( 'return shadow;', 'return max( 10.5, shadow );' );

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene()

const sizes = {
width: window.innerWidth,
height: window.innerHeight
}

window.addEventListener('resize', () =>
{

sizes.width = window.innerWidth
sizes.height = window.innerHeight
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 1.3, 260)
camera.position.x = 1
camera.position.y = 6
camera.position.z = 32
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias: true,
alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding;

const geometry = new THREE.Geometry( .3, 64, 64 );


const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0.02
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const loader = new GLTFLoader();
let myModel;
loader.load('scene33.gltf', function ( gltf ) {
myModel = gltf.scene;
scene.add(myModel);
gltf.animations; 
gltf.scene;
gltf.scenes; 
gltf.cameras; 
gltf.asset; 
},


);
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX
let mouseY

let targetX
let targetY

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove (event) {

mouseX = (event.clientX - windowHalfX)
mouseY = (event.clientY - windowHalfY)

}


const clock = new THREE.Clock()
//this bit controls how far mouse move yaws model

function animate () {
targetX = mouseX * .00006
targetY = mouseY * .00005

const elapsedTime = clock.getElapsedTime()


sphere.rotation.x = 0 * elapsedTime
sphere.rotation.y = 0 * elapsedTime

sphere.rotation.x += 2 * (targetY - sphere.rotation.x)
sphere.rotation.y += 1.5 * (targetX - sphere.rotation.y)

if (myModel){

myModel.rotation.set(targetY, targetX, myModel.rotation.z);

}

renderer.render(scene, camera)

window.requestAnimationFrame(animate)
function myFunction(x) {
if (x.matches) { 
targetY = mouseY * .00005;
} else {
targetY = mouseY * .000001;
}
}

var x = window.matchMedia("(max-width: 1200px)")
myFunction(x) 
x.addListener(myFunction) 

}
animate()
sphere.position.x = 5
sphere.position.y = 2
sphere.position.z = 2

//Setup SpotLight 1

const color = new THREE.Color('white'),
intensity = 10.4,
distance = 0,
angle = Math.PI * .054,
penumbra = 0.714,
decay = 0.2;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(-0.6, 53.7, 18);
scene.add(spotLight);

//  Ambient light
scene.add( new THREE.AmbientLight(0xffffff, .1));

// SpotLight 2
const SpotLight2 = new THREE.SpotLight(0xff0000, 2)
SpotLight2.position.set(1.05,-3.24,0.1)  
SpotLight2.intensity = 54.1,
distance = 30,
angle = Math.PI * 0.15,
penumbra = 0.25,
decay = 0.5;
const spotLight2 = new THREE.SpotLight2(color, intensity, distance, angle, penumbra, decay);
spotLight2.position.set(5.6, 3, 18);
scene.add(spotLight2);
scene.add( new THREE.AmbientLight(0x77ff));

scene.add(SpotLight2)







