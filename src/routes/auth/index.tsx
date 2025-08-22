import { lazy, Suspense } from "react";
import RootLayout from "../Rootlayout";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const LoginPage = lazy(() => import("../../pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("../../pages/Auth/SignupPage"));

const fakeApi = (message: string) =>
  new Promise<{ message: string }>((resolve) => {
    setTimeout(() => resolve({ message }), 500);
  });

const loginLoader = async () => await fakeApi("Welcome to Login Page");
const signupLoader = async () => await fakeApi("Welcome to Sign Up Page");

export const authRoutes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
          </Suspense>
        ),
        loader: loginLoader,
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SignUpPage />
          </Suspense>
        ),
        loader: signupLoader,
      },
    ],
  },
];

