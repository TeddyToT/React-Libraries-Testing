import { lazy, Suspense } from "react";
import RootLayout from "../Rootlayout";
import { redirect } from "react-router-dom";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
const HomePage = lazy(() => import("../../pages/user/Home/Home"));
const PersonName = lazy(() => import("../../pages/user/Zustand"));
const TimeTable = lazy(() => import("../../pages/user/TimeTable"));

import scheduleData from "../../data/schedule.json";

const fakeApi = (message: string, data?: any[]) => {

  if (!useRole.getRole()) {
    return redirect("/login");
  }
  if (useRole.getRole() !== "user") {
    alert("Back to Dashboard");
    return redirect("/dashboard");
  }
  return new Promise<{ message: string; data?: any[] }>((resolve) => {
    setTimeout(() => resolve({ message, data }), 500);
  });
};

const homeLoader = async () => await fakeApi("Home Page");
const personLoader = async () => await fakeApi("Person Name Page");
const scheduleLoader = async () => await fakeApi("Timetable", scheduleData);
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
      },
      {
        path: "/timetable",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TimeTable />
          </Suspense>
        ),
        loader: scheduleLoader,
      },
    ],
  },
];
