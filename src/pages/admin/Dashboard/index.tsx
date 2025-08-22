import { useLoaderData } from "react-router-dom";

export default function LoginPage() {
  const data = useLoaderData() as { message: string };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-10">{data.message}</h2>
        <table className="w-2/3 border p-10">
          <thead>
            <tr className="p-4 border-b border-slate-600">
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className=" text-center p-4 border-b border-slate-200">
              <td>An</td>
              <td>25</td>
            </tr>
            <tr className="">
              <td>Bình</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
