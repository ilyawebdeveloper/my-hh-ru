import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router";
import { router } from "./routes.ts";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const theme = createTheme({
  colors: {
    indigo: [
      "#EDF2FF",
      "#DBE4FF",
      "#BAC8FF",
      "#91A7FF",
      "#748FFC",
      "#5C7CFA",
      "#4C6EF5",
      "#4263EB",
      "#3B5BDB",
      "#364FC7",
    ],
  },
});

const root = document.getElementById("root")!;

createRoot(root).render(
  <MantineProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </MantineProvider>
);
