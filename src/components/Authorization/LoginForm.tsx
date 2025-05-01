import { useState } from 'react';

interface LoginResponse {
  token: string;
  message?: string;
}

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await fetch('//api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
      });

      const data: LoginResponse = await response.json();

      if(response.ok){
        localStorage.setItem('token', data.token);
        alert('로그인 성공!');
      } else {
        alert('로그인 실패:' + (data.message || '오류 발생'))
      } 
    } catch(error){
      console.error('에러발생:',error);
    }
  };

  // JWT 받아서 localSotrage에 저장
  localStorage.setItem('token', jwtFromServer);
  const token = localStorage.getItem('token');

  // API 요청 시
  await fetch(`${API_URL}/help`, {
    headers:{
      'Authorization': 'Bearer ${token}'
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인</h1>

      <div>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
