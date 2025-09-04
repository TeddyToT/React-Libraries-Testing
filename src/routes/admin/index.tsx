import { lazy, Suspense } from "react";
import { redirect } from "react-router-dom";
import RootLayout from "../Rootlayout";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import useRole from "../../hooks/useRole";
import coffeSaleData from "../../data/coffe_sales.json";
const Dashboard = lazy(() => import("../../pages/admin/Dashboard"));
const TipTap = lazy(() => import("../../pages/admin/TipTap"));

const fakeApi = (message: string, data?: any[]) => {
  if (!useRole.getRole()) {
    return redirect("/login");
  }
  if (useRole.getRole() !== "admin") {
    alert("Back to Home");
    return redirect("/");
  }
  return new Promise<{ message: string; data?: any[] }>((resolve) => {
    setTimeout(() => resolve({ message, data }), 500);
  });
};

const dashboardLoader = async () => fakeApi("Admin Dashboard", coffeSaleData);
const tipTapLoader = async () => fakeApi("TipTap");


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
        loader: dashboardLoader,
      },
            {
        path: "/tip-tap",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TipTap />
          </Suspense>
        ),
        loader: tipTapLoader,
      },
    ],
  },
];
