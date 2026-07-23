import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { JoinLanding, JoinMasterForm, JoinVolunteerForm } from "./components/JoinPages";
import Contribute from "./components/Contribute";
import OrderPage from "./components/contribute/OrderPage";
import Participants from "./components/Participants/Participants";
import Gallery from "./components/Gallery/Gallery";
import Program from "./components/Program";
import GettingThere from "./components/GettingThere";
import AnalyticsLoader from "./components/GTMLoader";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Feedback from "./components/Feedback";

import "./index.css";
import "./i18n";

function Layout() {
  return (
    <div className="min-h-screen bg-main">
      <AnalyticsLoader />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

const routerBasename = process.env.PUBLIC_URL || "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contacts", element: <Contacts /> },
        { path: "feedback", element: <Feedback /> },
        { path: "join", element: <JoinLanding /> },
        { path: "join/volunteer", element: <JoinVolunteerForm /> },
        { path: "join/master", element: <JoinMasterForm /> },
        { path: "program", element: <Program /> },
        { path: "getting-there", element: <GettingThere /> },
        { path: "contribute", element: <Contribute /> },
        { path: "contribute/password-reset", element: <Contribute autoOpenTickets={false} /> },
        { path: "contribute/orders", element: <Contribute autoOpenTickets={false} /> },
        { path: "contribute/orders/:orderId", element: <OrderPage /> },
        { path: "contribute/tickets", element: <Contribute autoOpenTickets={false} /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/participants",
      element: <Participants />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
  ],
  { basename: routerBasename }
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ScrollToTopButton />
    </>
  );
}
