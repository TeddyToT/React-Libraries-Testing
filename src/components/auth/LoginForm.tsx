import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth"
import type { LoginFormData } from "../../schemas/auth";
import { Link } from "react-router-dom";
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input type="email" placeholder="Email" {...register("email")} className="border p-2 rounded" />
      <p className="text-red-500">{errors.email?.message}</p>

      <input type="password" placeholder="Mật khẩu" {...register("password")} className="border p-2 rounded" />
      <p className="text-red-500">{errors.password?.message}</p>

      <Link to={"/signup"}>
      Chưa có tài khoản? Đăng ký ngay
      </Link>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Đăng nhập
      </button>
    </form>
  );
}
