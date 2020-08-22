var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial( { color: "red" } )
);
scene.add(cube);


var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add( ambientLight );

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(3,0,0);
scene.add(pointLight);


renderer.render(scene, camera);

function animate() {
	requestAnimationFrame(animate);
    cube.rotation.y += THREE.MathUtils.degToRad(0.5);
	renderer.render(scene, camera);
}

animate();