/* ============================== SCENE ============================== */

var scene = new THREE.Scene();


/* ============================== RENDERER ============================== */

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor("hsl(0,0%,20%)");
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);


/* ============================== HELPERS ============================== */

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var gridHelper = new THREE.GridHelper(8,8);
scene.add(gridHelper);



/* ============================== CAMERA ============================== */

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 3;
camera.position.y = 4;
camera.position.z = 3;
camera.lookAt(0,0,0);



/* ============================== MESHES ============================== */

var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(6,6,6,6),
    new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);
plane.rotation.x = THREE.MathUtils.degToRad(-90);
plane.receiveShadow = true;
scene.add(plane);


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: "red" })
);
cube.position.y = 0.5;
cube.castShadow = true;
scene.add(cube);



/* ============================== LIGHTS ============================== */

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(3,3,0);
pointLight.castShadow = true;
pointLight.decay = 2;
scene.add(pointLight);

var pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);



/* ============================== GUI CONTROLS ============================== */

var gui = new dat.GUI();

let cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x").min(-4).max(4).step(0.5).name("posX").onChange(() => camera.lookAt(0,0,0));
cameraFolder.add(camera.position, "y").min(-4).max(4).step(0.5).name("posY").onChange(() => camera.lookAt(0,0,0));
cameraFolder.add(camera.position, "z").min(-4).max(4).step(0.5).name("posZ").onChange(() => camera.lookAt(0,0,0));
cameraFolder.open();

let cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.position, "x").min(-2.5).max(2.5).step(0.5).name("posX");
cubeFolder.add(cube.position, "y").min(0.5).max(2.5).step(0.5).name("posY");
cubeFolder.add(cube.position, "z").min(-2.5).max(2.5).step(0.5).name("posZ");
let guiMediumObj = {
    cubeColor : {
        r : 255,
        g : 0,
        b : 0,
    }
};
cubeFolder.addColor(guiMediumObj, "cubeColor").onChange(function (value) {
    let rgb = Object.values(value).map(value => value / 255);
    cube.material.color.setRGB(...rgb);
});
cubeFolder.open();

let lightFolder = gui.addFolder("Light");
lightFolder.add(pointLight.position, "x").min(-4).max(4).step(0.5).name("posX");
lightFolder.add(pointLight.position, "y").min(0.5).max(4).step(0.5).name("posY");
lightFolder.add(pointLight.position, "z").min(-4).max(4).step(0.5).name("posZ");
lightFolder.add(pointLight, "intensity").min(0).max(2).step(0.25);
lightFolder.open();



/* ============================== RENDER ============================== */

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();