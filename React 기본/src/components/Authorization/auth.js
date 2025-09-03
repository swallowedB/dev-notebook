const { default: axios } = require("axios");

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 시 AccessToken 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

// 401 에러 응답 시 -> AccessToken 재발급 시도
api.interceptors.response.use(
  res => res,
  async (error) => {
    if(error.response?.status === 401){
      try{
        const res = await api.post('/auth/token/refresh');
        const newAccessToken = res.headers['authorization'].replace('Bearer ', '');
        localStorage.setItem("accessToken", newAccessToken);
        //원래 요청 재시도
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }catch(refreshError){
        console.error('리프레시 실패 -> 로그아웃')
      }
    }
    return Promise.reject(error);
  }
)