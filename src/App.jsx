import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

function App() {

  useEffect(() => {
    const statsFPS = new Stats();
    statsFPS.showPanel(0); // FPS panel
    document.body.appendChild(statsFPS.dom);
    const statsMS = new Stats();
    statsMS.showPanel(1); // MS panel
    document.body.appendChild(statsMS.dom);
    const statsMB = new Stats();
    statsMB.showPanel(2); // MB panel
    document.body.appendChild(statsMB.dom);

    statsMS.dom.style.position = 'absolute';
    statsMS.dom.style.top = '50px'; // Shift 50px below FPS panel
    statsMS.dom.style.left = '0px';

    statsMB.dom.style.position = 'absolute';
    statsMB.dom.style.top = '100px'; // Shift 100px below FPS panel
    statsMB.dom.style.left = '0px';

    const scene = new THREE.Scene();
    const cubeGeometry = new THREE.BoxGeometry(16, 16,16,16, 16,16);
    const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true})
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // scene.add(cubeMesh);

    const icoGeometry = new THREE.SphereGeometry(2, 40, 40)
    const icoMaterial = new THREE.ShaderMaterial({fragmentShader: fragmentShader, vertexShader: vertexShader})
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icoMesh)

    icoMaterial.uniforms.uTime = {value: 0}
    icoMaterial.uniforms.uRadius = {value: 0.2}
    console.log(icoMaterial.uniforms)
    const axisHelper = new THREE.AxesHelper(20);
    scene.add(axisHelper);


    const ambientLight = new THREE.AmbientLight("white", 1);
    const pointLight = new THREE.PointLight("white", 100)
    // scene.add(pointLight);
    pointLight.position.set(0, 0, 5)
    scene.add(ambientLight)
    
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 2;
    camera.aspect = window.innerWidth / window.innerHeight;

    const canvas = document.querySelector(".threejs")

    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)
    renderer.setClearColor(0xffff00)

    const maxPixelRatio = Math.min(window.devicePixelRatio, 2); 
    renderer.setPixelRatio(maxPixelRatio); 

   

    const control = new OrbitControls(camera, canvas)
    control.enableDamping = true;
    // control.autoRotate = true;

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    })
    const renderLoop = () => {
      statsFPS.begin()
      statsMB.begin()
      statsMS.begin()

      control.update()
      renderer.render(scene, camera)
      requestAnimationFrame(renderLoop)
      
      statsFPS.end()
      statsMB.end()
      statsMS.end()
    }
    renderLoop();
  }, [])

  return (
    <div><canvas className='threejs'></canvas></div>
  )
}

export default App
