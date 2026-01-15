import { createBrowserRouter } from "react-router";
import App from "./App";
import AuthWrapper from "./components/auth/AuthWrapper";
import VacancyPage from "./pages/VacancyPage";
import AboutMePage from "./pages/AboutMePage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthWrapper,
  },
  {
    path: "vacansies",
    Component: App,
    children: [{ path: ":city", Component: App }],
  },

  { path: "vacansies/vacancy/:id", Component: VacancyPage },
  { path: "about", Component: AboutMePage },
  { path: "*", Component: ErrorPage },
  { path: "vacansies/not-found", Component: ErrorPage },
]);
