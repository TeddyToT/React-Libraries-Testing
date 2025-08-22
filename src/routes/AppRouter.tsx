import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "./auth";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";

const router = createBrowserRouter([
  ...authRoutes,
  ...adminRoutes,
  ...userRoutes,
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
