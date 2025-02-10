import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });  // Habilitar fondo transparente

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 10); // Intensidad alta
scene.add(ambientLight);

// Luz direccional para sombras y detalles
const directionalLight = new THREE.DirectionalLight(0xffffff, 4); // Intensidad aumentada a 1
directionalLight.position.set(10, 10, 10); // Ajusta la posición según sea necesario
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 10, 100); // Color, intensidad, distancia
pointLight.position.set(5, 5, 5); // Posición de la luz
scene.add(pointLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Color cielo, color suelo, intensidad
scene.add(hemisphereLight);

ambientLight.intensity = 20; // Aumentar la intensidad de la luz ambiental
directionalLight.intensity = 5;

const pointLight2 = new THREE.PointLight(0xffffff, 2, 100); // Intensidad aumentada a 2
pointLight2.position.set(0, 10, 0); // Posición arriba del modelo
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 2, 100); // Intensidad aumentada a 2
pointLight3.position.set(0, 0, 10); // Posición arriba del modelo
scene.add(pointLight3);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 6);
directionalLight2.position.set(-10, 10, -10); // Posición opuesta a la primera luz direccional
scene.add(directionalLight2);

renderer.toneMapping = THREE.ACESFilmicToneMapping; // Tipo de tonemapping
renderer.toneMappingExposure = 5;

const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);

// Ajustar el tamaño del renderizador al tamaño del contenedor
renderer.setSize(container.clientWidth, container.clientHeight);

// Ruta al modelo 3D (ajusta según tu servidor local)
const modelPath = './textured_mesh.glb';

// Cargar el modelo 3D
loader.load(
    modelPath, // Ruta al archivo GLTF
    function (glb) {
        // Aquí eliminamos cualquier base o malla que pueda haber sido añadida
        glb.scene.traverse(function (child) {
            if (child.isMesh && child.name === "nombre_base_o_plano") {
                scene.remove(child);  // Elimina la base si tiene un nombre específico
            }
        });
        scene.add(glb.scene);
    },
    undefined,
    function (error) {
        console.error('Error al cargar el modelo:', error);
    }
);



// Posición inicial de la cámara
camera.position.z = 2;

// Control de órbita para rotación interactiva
const controls = new OrbitControls(camera, renderer.domElement);

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Aquí puedes agregar rotación manual si lo prefieres:
    // scene.rotation.y += 0.01;  // Esto hará que el modelo gire de forma constante

    controls.update();  // Actualizar controles de órbita

    renderer.render(scene, camera);
}

animate();

// Ajustar tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
