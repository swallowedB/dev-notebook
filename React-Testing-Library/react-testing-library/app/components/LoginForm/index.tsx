import { useState } from "react";
import { Input } from "../Input";

export default function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (field: keyof typeof values) => {
    setValues((prev) => ({ ...prev, [field]: "" }));
  };


  return (
    <form className="flex flex-col gap-4 w-80 p-6 bg-white">
      <div>
        <label htmlFor="email" className="block mb-2">
          이메일
        </label>
        {/* Input에 value와 onChange를 넣을 수 없는 상황 */}
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="이메일을 입력하세요"
          onDelete={() => handleDelete("email")}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          비밀번호
        </label>
        {/* Input에 value와 onChange를 넣을 수 없는 상황 */}
        <Input
          id="password"
          name="password"
          // 에러
          value={values.password}
          // 에러
          onChange={handleChange}
          type="password"
          placeholder="비밀번호를 입력하세요"
          onDelete={() => handleDelete("password")}
        />
      </div>
      <button 
      disabled={!values.email || !values.password}
      className="bg-blue-500 rounded-md w-full cursor-pointer p-2 text-white">
        로그인
      </button>
    </form>
  );
}
