import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Main from "../pages/Main/MainPage";
import LoginPage from "../pages/Login/LoginPage";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/main",
          element: <Main />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForAuthenticatedOnly,
    ...(!token ? routesForNotAuthenticatedOnly : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
