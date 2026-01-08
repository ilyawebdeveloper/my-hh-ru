import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, MantineProvider } from "@mantine/core";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
