import { createBrowserRouter, Navigate } from "react-router";
import App from "@/app/layout/App";
import HomePage from "@/features/home/HomePage";
import Catalog from "@/features/catalog/components/Catalog";
import AboutPage from "@/features/about/AboutPage";
import ProductDetails from "@/features/catalog/components/ProductDetails";
import StorePolicyPage from "@/features/storepolicy/StorePolicyPage";
import ServerError from "@/app/errors/ServerError";
import NotFound from "@/app/errors/NotFound";
import BasketPage from "@/features/basket/BasketPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";
import LoginForm from "@/features/account/LoginForm";
import RegisterForm from "@/features/account/RegisterForm";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "/checkout", element: <CheckoutPage /> }],
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/store-policy",
        element: <StorePolicyPage />,
      },
      {
        path: "/basket",
        element: <BasketPage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/server-error",
        element: <ServerError />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
