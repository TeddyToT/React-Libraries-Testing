import { lazy, Suspense } from "react";
import RootLayout from "../Rootlayout";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const HomePage = lazy(() => import("../../pages/user/Home/Home"));
const PersonName = lazy(() => import("../../pages/user/Zustand"));

const fakeApi = (message: string) =>
  new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message }), 500);
  });

const homeLoader = async () => await fakeApi("Home Page");
const personLoader = async () => await fakeApi("Person Name Page");

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
      },
      {
        path: "/person-name",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PersonName />
          </Suspense>
        ),
        loader: personLoader,
      }
    ],
  },
];

