import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Players from "./players";
import Teams from "./teams";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><h1>Welcome to Saudi Pro League</h1><p>Here you can find the latest achievements of your favorite <a href="/teams_page">Team</a> or <a href="/players_page">Player</a>.</p></div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/teams_page",
    element: <Teams />
  },
  {
    path: "/players_page",
    element: <Players />
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
