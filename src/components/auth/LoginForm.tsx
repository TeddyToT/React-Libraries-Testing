import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import type { LoginFormData } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  const navigate = useNavigate();
  const onUserClick = () => {
    useRole.setRole("user");
    navigate("/");
  };

  const onAdminClick = () => {
    useRole.setRole("admin");
    navigate("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border p-2 rounded"
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Mật khẩu"
          {...register("password")}
          className="border p-2 rounded"
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <Link to={"/signup"}>Chưa có tài khoản? Đăng ký ngay</Link>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Đăng nhập
        </button>
      </form>
      <div className="flex flex-col gap-5 mt-20 w-full items-center justify-center">
        <button className="p-3 border cursor-pointer hover:bg-blue-300" onClick={onUserClick}>
          User
        </button>
        <button className="p-3 border cursor-pointer hover:bg-blue-300" onClick={onAdminClick}>
          Admin
        </button>
      </div>
    </>
  );
}
