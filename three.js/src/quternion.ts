import * as THREE from 'three'
import './style.css'

// ───────────────────────────────────────────────────────────
// 공통: 렌더러 / 씬 / 카메라 / 라이트
// ───────────────────────────────────────────────────────────
const canvas = document.querySelector('#app') as HTMLCanvasElement

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
scene.background = new THREE.Color('#0f0f12')

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, 0, 8)
camera.lookAt(0, 0, 0)

const ambient = new THREE.AmbientLight(0xffffff, 0.45)
const dir = new THREE.DirectionalLight(0xffffff, 1.2)
dir.position.set(5, 5, 5)
scene.add(ambient, dir)

// ───────────────────────────────────────────────────────────
// 도우미: 방향봉(rig + body) 생성
//   - body의 +Z가 "앞"처럼 보이도록 길쭉한 박스 + 빨간 코(nose)
// ───────────────────────────────────────────────────────────
function makeRig(xPos: number, color: string) {
  const rig = new THREE.Group()
  rig.position.x = xPos
  scene.add(rig)

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 1.4),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0 })
  )
  rig.add(body)

  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshStandardMaterial({ color: '#ff3b3b' })
  )
  nose.position.z = 0.8 // +Z 방향에 빨간 코
  body.add(nose)

  body.add(new THREE.AxesHelper(1.1)) // x=red, y=green, z=blue(+Z)

  return { rig, body }
}

// 왼쪽: SNAP(즉시 스냅), 오른쪽: SMOOTH(slerp)
const L = makeRig(-2.4, '#7aa2ff') // SNAP
const R = makeRig( 2.4, '#ffd27a') // SMOOTH

// ───────────────────────────────────────────────────────────
// 마우스 → z=0 평면 교차점(targetWorld) 계산
//  - 마우스를 빠르게 흔들면 slerp 차이가 눈에 확 들어옴
// ───────────────────────────────────────────────────────────
const raycaster = new THREE.Raycaster()
const ndc = new THREE.Vector2()
const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) // z=0 평면
const targetWorld = new THREE.Vector3(0, 0, 0) // 기본값: 원점

window.addEventListener('pointermove', (e) => {
  ndc.x =  (e.clientX / window.innerWidth)  * 2 - 1
  ndc.y = -(e.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(ndc, camera)
  // 교차점이 있으면 targetWorld로 갱신
  raycaster.ray.intersectPlane(planeZ0, targetWorld)
})

// ───────────────────────────────────────────────────────────
// slerp용 보조: 같은 부모 공간에서 목표 쿼터니언 계산
//  - targetHelper는 R.body와 같은 부모(R.rig) 아래 두어 로컬 기준 일치
//  - damp(λ, dt): 프레임레이트에 덜 민감한 감쇠계수
// ───────────────────────────────────────────────────────────
const clock = new THREE.Clock()
const targetHelper = new THREE.Object3D()
R.rig.add(targetHelper) // R.body와 같은 부모공간

const qTarget = new THREE.Quaternion()
const FOLLOW_RATE = 2 // 2=느림, 6=부드럽, 20=민첩 — 바꿔가며 비교!
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt)

// ───────────────────────────────────────────────────────────
// 루프: 왼쪽은 스냅, 오른쪽은 slerp로 타깃을 바라보게
// ───────────────────────────────────────────────────────────
function tick() {
  const dt = clock.getDelta()

  // (옵션) 부모 공전 조금 추가 → 차이가 더 도드라짐
  L.rig.rotation.y += 0.4 * dt
  R.rig.rotation.y += 0.4 * dt

  // 왼쪽(SNAP): 즉시 타깃을 바라봄 → 툭툭 꺾이는 느낌
  L.body.lookAt(targetWorld)

  // 오른쪽(SMOOTH): 목표 쿼터니언을 계산 후 slerp로 부드럽게 추종
  targetHelper.position.copy(R.body.position) // 같은 로컬 공간에서 계산
  targetHelper.lookAt(targetWorld)            // 월드의 타깃을 바라보는 자세
  qTarget.copy(targetHelper.quaternion)       // 목표 로컬 쿼터니언

  R.body.quaternion.slerp(qTarget, damp(FOLLOW_RATE, dt))

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()

// 리사이즈 대응
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
