import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

// --- Configuración inicial ---
// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias suaviza los bordes
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Geometría y Materiales ---
// Geometría compartida para los tres cubos
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Materiales para cada cubo
const materialGreen = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const materialBlue = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const materialRed = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// --- Creación y Posicionamiento de los Cubos ---
// Cubo Verde
const cubeGreen = new THREE.Mesh(geometry, materialGreen);
cubeGreen.position.x = -2.5; // Posicionar a la izquierda
scene.add(cubeGreen);

// Cubo Azul
const cubeBlue = new THREE.Mesh(geometry, materialBlue);
// Se queda en la posición central (0, 0, 0)
scene.add(cubeBlue);

// Cubo Rojo
const cubeRed = new THREE.Mesh(geometry, materialRed);
cubeRed.position.x = 2.5; // Posicionar a la derecha
scene.add(cubeRed);

// --- Iluminación ---
// Luz ambiental para una iluminación general suave
const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

// Luz direccional para crear sombras y reflejos
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// --- Posicionamiento de la Cámara ---
camera.position.z = 5;

// --- Función de Animación ---
// Esta función se ejecuta en un bucle constante (unas 60 veces por segundo)
function animate() {
    // Rotación para el cubo verde (ejes X e Y)
    cubeGreen.rotation.x += 0.015;
    cubeGreen.rotation.y += 0.015;

    // Rotación para el cubo azul (solo en el eje Y, más rápido)
     cubeBlue.rotation.x += 0.025;
    cubeBlue.rotation.y += 0.025;

    // Rotación para el cubo rojo (ejes X y Z en direcciones opuestas)
    cubeRed.rotation.x -= 0.055;
    cubeRed.rotation.z += 0.055;

    // Renderizar la escena desde la perspectiva de la cámara
    renderer.render(scene, camera);
}

// Iniciar el bucle de animación
renderer.setAnimationLoop(animate);

// --- Manejo del cambio de tamaño de la ventana ---
// Función para que la escena se ajuste si el usuario cambia el tamaño de la ventana del navegador
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});