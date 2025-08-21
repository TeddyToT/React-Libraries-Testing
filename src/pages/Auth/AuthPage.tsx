import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import SignUpForm from "../../components/auth/SignUpForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md md:w-1/3 w-1/2 ">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 underline cursor-pointer"
        >
          {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
        </button>
      </div>
    </div>
  );
}
