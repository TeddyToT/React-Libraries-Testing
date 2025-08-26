import { lazy, Suspense } from "react";
import { redirect } from "react-router-dom";
import RootLayout from "../Rootlayout";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { getCurrentUser } from "../../services/auth.service";

const Dashboard = lazy(() => import("../../pages/admin/Dashboard"));


const fakeApi = (message: string, data?: any[]) =>
  new Promise<{ message: string, data?: any[] }>((resolve) => {
    setTimeout(() => resolve({ message, data }), 500);
  });

const dashboardLoader = async () => {
  const user = getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  if (user !== "admin") {
    return redirect("/login");
  }

  return await fakeApi("Admin Dashboard");
};

export const adminRoutes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
        loader: dashboardLoader
      },
    ],
  },
];
