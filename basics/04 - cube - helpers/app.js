var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


var axesHelper = new THREE.AxesHelper(6);
axesHelper.position.y = -0.5;
scene.add(axesHelper);

var gridHelper = new THREE.GridHelper(5,5);
gridHelper.position.y = -0.5;
scene.add(gridHelper);


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
camera.position.y = 1;
camera.lookAt(0,0,0);


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial( { color: "red" } )
);
cube.castShadow = true;
scene.add(cube);

var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4,4),
    new THREE.MeshLambertMaterial( { color: 0xffffff } )
);
plane.rotation.x = THREE.MathUtils.degToRad(-90);
plane.position.y = -cube.geometry.parameters.height / 2;
plane.receiveShadow = true;
scene.add(plane);


var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(3,0,0);
pointLight.castShadow = true;
scene.add(pointLight);


renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += THREE.MathUtils.degToRad(0.5);
    renderer.render(scene, camera);
}

animate();