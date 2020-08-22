var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;


var cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( { color: "red" } )
);
scene.add(cube);


renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += THREE.MathUtils.degToRad(0.5);
    renderer.render(scene, camera);
}

animate();