import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/auth";
import type { SignUpFormData } from "../../schemas/auth";

export default function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign Up:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input type="text" placeholder="Tên" {...register("name")} className="border p-2 rounded" />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>

      <input type="email" placeholder="Email" {...register("email")} className="border p-2 rounded" />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>

      <input type="password" placeholder="Mật khẩu" {...register("password")} className="border p-2 rounded" />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <input type="password" placeholder="Xác nhận mật khẩu" {...register("confirmPassword")} className="border p-2 rounded" />
      <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Đăng ký
      </button>
    </form>
  );
}
