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
import RequireGuest from "./RequireGuest";
import CheckoutSuccess from "@/features/checkout/components/CheckoutSuccess";
import OrderPage from "@/features/orders/OrderPage";
import OrderDetailsPage from "@/features/orders/OrderDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Protected routes (require authentication)
      {
        element: <RequireAuth />,
        children: [
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/checkout/success", element: <CheckoutSuccess /> },
          { path: "/orders", element: <OrderPage /> },
          { path: "/orders/:id", element: <OrderDetailsPage /> },
        ],
      },
      // Guest-only routes (redirect if authenticated)
      {
        element: <RequireGuest />,
        children: [
          { path: "/login", element: <LoginForm /> },
          { path: "/register", element: <RegisterForm /> },
        ],
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
