import * as THREE from "three";
import "./style.css";

const USE_SMOOTH = false;   // true=부드럽게 추종(slerp), false=즉시 스냅
const FOLLOW_RATE = 8;     // 클수록 목표를 빨리 따라감 (감쇠 세기)

// 캔버스 세팅
const canvas = document.querySelector("#app") as HTMLCanvasElement;

// 렌더러 세팅
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});

renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// 씬과 배경색 세팅
const scene = new THREE.Scene();
scene.background = new THREE.Color("#0f0f12");

// 카메라 세팅
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 0, 6);

// 라이트 설정
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
const dir = new THREE.DirectionalLight(0xffffff, 1.2);
dir.position.set(5, 5, 5);

scene.add(ambient, dir);

const clock = new THREE.Clock() // 델타용 clock

// 1) 공용 지오매트리 & 재질
const geom = new THREE.BoxGeometry(1, 1, 1);
const matBase = new THREE.MeshStandardMaterial({
  color: "#7aa2ff",
  roughness: 0.4,
});
const matChild = new THREE.MeshStandardMaterial({
  color: "#ffd27a",
  roughness: 0.4,
});

// 2) 부모 그룹(rig) 만들기
const rig = new THREE.Group();
scene.add(rig);

// 3) 중심 큐브(자전만)
const base = new THREE.Mesh(geom, matBase);
rig.add(base);

const child = new THREE.Mesh(geom, matChild);
child.position.x = 1.5;
rig.add(child);

child.rotation.set(0,0,0)
child.rotation.order = 'XYZ'



const target = new THREE.Object3D() // 목표 계산용 더미
rig.add(target);

const qTarget = new THREE.Quaternion();
const qRoll = new THREE.Quaternion();
const fwdZ = new THREE.Vector3(0,0,-1)

const damp = (lambda: number, dt:number) => 1 - Math.exp(-lambda * dt)

let t = 0;
function tick() {
  const dt = clock.getDelta();
  t += dt

  rig.rotation.y += 1.6*dt;

  // child와 같은 부모 공간에서 target을 child 위치에 둔다.
  target.position.copy(child.position)

  //target을 월드의 원점을 바라보게 설정 -> 목표 쿼터니언 얻기
  target.lookAt(0,0,0)
  qTarget.copy(target.quaternion)

  if (USE_SMOOTH) {
  child.quaternion.slerp(qTarget, damp(FOLLOW_RATE, dt)); // 부드럽게 따라가기
} else {
  child.quaternion.copy(qTarget); // 매 프레임 즉시 스냅(튀는 느낌)
}

  //현재 child의 쿼터니온을 qTarget 쪽으로 감쇠 'slerp'
  child.quaternion.slerp(qTarget,damp(20, dt))

  // ④ 로컬 "앞(-Z)" 축 기준 롤을 살짝 얹기 (가벼운 흔들림)
  qRoll.setFromAxisAngle(fwdZ, Math.sin(t * 2) * 0.4);
  child.quaternion.multiply(qRoll);

  
  // child.rotation.x = Math.sin(t) * 1.0;
  // child.rotation.y = Math.cos(t * 0.6) * 1.0;
  
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();



// child.add(new THREE.AxesHelper(1.2));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
