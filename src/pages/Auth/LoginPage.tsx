import { useLoaderData } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
    const data = useLoaderData() as { message: string };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h2 className="text-xl font-bold mb-4">{data.message}</h2>
        <LoginForm />
      </div>
    </div>
  );
}
