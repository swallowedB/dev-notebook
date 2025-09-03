import * as THREE from 'three'
import './style.css'

// 캔버스 세팅
const canvas = document.querySelector('#app') as HTMLCanvasElement

// 렌더러 세팅
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
})

renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace

// 씬과 배경색 세팅
const scene = new THREE.Scene()
scene.background = new THREE.Color('#0f0f12')

// 카메라 세팅
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.set(0,0,6)

// 라이트 설정
const ambient = new THREE.AmbientLight(0xffffff, 0.4)
const dir = new THREE.DirectionalLight(0xffffff, 1.2)
dir.position.set(5,5,5)

scene.add(ambient, dir)

// 매쉬 = 모델링 + 재질
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({
    color: '#7aa2ff',
    roughness: 0.4,
    metalness: 0.4,
  })
)
scene.add(cube)


function tick() {
  cube.rotation.x += 0.005
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

