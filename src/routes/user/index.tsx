import { lazy, Suspense } from "react";
import RootLayout from "../Rootlayout";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const HomePage = lazy(() => import("../../pages/user/Home/Home"));

const fakeApi = (message: string) =>
  new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message }), 500);
  });

const homeLoader = async () => await fakeApi("Home Page");

export const userRoutes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
        loader: homeLoader,
      }
    ],
  },
];

