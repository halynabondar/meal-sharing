import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./frontend/components/HomePage/HomePage.jsx";
import "./main.css";
import MealsList from "./frontend/components/Meals/MealsList.jsx";
import AboutUs from "./frontend/components/AboutUs/AboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/meals",
    element: <MealsList />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
