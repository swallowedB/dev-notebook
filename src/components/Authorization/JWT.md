# 인증 / 인가 처리 원리 및 개념

## ✅ 로그인 원리
- 일반 로그인 : 이메일/비번 입력 -> 유효성 검사 -> 백엔드 전송 -> 토큰 받기
- 소셜 로그인 : 버튼 클릭 -> 소셜에서 인증 -> 토큰 받기 -> 서버에 전달 -> 검증,확인 -> JWT 발급 -> JWT를 받아서 보관(프론트)

## ✅ JWT : 인증된 사용자인지 식별하기 위해 서버가 발급하는 디지털 신분증 같은 것
- 구조 : `.`으로 구분되며, `Header(토큰의 타입과 서명방식)`, `payload(사용자 정보 등 실제 데이터)`, `Singature(2개+비밀키로 만든 서명=위조방지)`

- 활용 : 서버가 JWT 발급해주면 이걸 `쿠키든 로컬이든 어디에 저장`해서 `모든 API 요청 헤더에 JWT를 실어서 같이` 보내야함 -> 서버가 이를 보고 인증/인가를 처리

### ⚠️ 주의 : 노출되면 곧바로 탈취 위험이 있으므로 보안 중요!! 
-  `HTTPS` + `만료시간 설정` + `리프레시 토큰`을 같이 사용
  

## ✅ 만료시간, 리프레시 토큰
  ### 📍 토큰의 종류
  - Access Token : 인증된 사용자임을 증명하는 **짧은 토큰** (15분~1시간)
  - Refresh Token : **Access Token이 만료**되었을 때, 새 토큰을 받아오기 위한 긴 토큰 (7일~30일)
  - `Access Token(짧게)- 탈취돼도 피해를 최소화`
  - `Refresh Token(길게)- 사용자 편의성 유지`

## 🍪 3. JWT vs 세션 쿠키 비교

| 항목 | JWT | 세션 쿠키 |
|------|-----|-----------|
| 저장 위치 | 주로 **localStorage** / **cookie** | 브라우저 쿠키 |
| 서버 상태 | **Stateless** (서버 저장 X) | **Stateful** (서버에 세션 저장) |
| 확장성 | 모바일/SPA에 강함 | SSR + 쿠키 기반 앱에 강함 |
| 보안 | XSS에 민감 | CSRF에 민감 |
| 추천 | API 기반, 모바일, React 등 SPA | 전통적인 서버 기반 웹 |

## ✅ JWT 만료 감지 -> 자동 로그아웃
1. 토큰에서 만료 시간 `exp` 확인
   ```
   function getTokenPayload(token){
    const payloadBase64 = token.split('.')[1];
    return JSON.parse(atob(payloadBase64));
   }

   function isTokenExpired(token){
    const { exp } = getTokenPayload(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
   }
   ```

2. 매 요청 시 검사
   ```
   const token = localStorage.getItem('token');
   if(token && isTokenExpired(token)){
    localStorage.removeItem('token');
    alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    window.location.href = '/login';
   }
   ```