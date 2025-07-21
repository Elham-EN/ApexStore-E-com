import { createBrowserRouter } from "react-router";
import App from "@/app/layout/App";
import HomePage from "@/features/home/HomePage";
import Catalog from "@/features/catalog/components/Catalog";
import AboutPage from "@/features/about/AboutPage";
import ProductDetails from "@/features/catalog/components/ProductDetails";
import StorePolicyPage from "@/features/storepolicy/StorePolicyPage";
import ServerError from "../errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "/server-error",
        element: <ServerError />,
      },
    ],
  },
]);
