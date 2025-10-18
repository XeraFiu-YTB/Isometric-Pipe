import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { getLines } from './state.js';

const container = document.getElementById('view-3d');
let scene, camera, renderer;
let pipesGroup; // To hold all the pipe meshes

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 10);
    camera.lookAt(5, 5, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    pipesGroup = new THREE.Group();
    scene.add(pipesGroup);

    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createPipe(startVec, endVec) {
    const pipeRadius = 0.1;
    const material = new THREE.MeshPhongMaterial({ color: 0x666666 });

    const distance = startVec.distanceTo(endVec);
    const geometry = new THREE.CylinderGeometry(pipeRadius, pipeRadius, distance, 16);

    const pipe = new THREE.Mesh(geometry, material);

    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    pipe.quaternion.copy(quaternion);
    pipe.position.copy(startVec).add(direction.multiplyScalar(0.5));

    return pipe;
}

export function updateScene() {
    pipesGroup.clear();

    const lines = getLines();
    const scale = 1 / 50; // Scale from canvas pixels to 3D units

    lines.forEach(line => {
        const start = new THREE.Vector3(line.start.x * scale, -line.start.y * scale, 0);
        const end = new THREE.Vector3(line.end.x * scale, -line.end.y * scale, 0);

        const pipeMesh = createPipe(start, end);
        pipesGroup.add(pipeMesh);
    });

    const box = new THREE.Box3().setFromObject(pipesGroup);
    const center = box.getCenter(new THREE.Vector3());
    if(!isNaN(center.x)){
        camera.lookAt(center);
    }
}

export function initViewer3D() {
    init();
    console.log('3D Viewer Initialized');
}
