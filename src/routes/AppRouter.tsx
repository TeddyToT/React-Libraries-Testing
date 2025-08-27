import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "./auth";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";
import AppLayout from "../layout/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      ...authRoutes,
      ...adminRoutes,
      ...userRoutes,
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
