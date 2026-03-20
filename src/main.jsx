import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecordsProvider } from "./context/RecordsContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecordsProvider>
      <App />
    </RecordsProvider>
  </StrictMode>,
);
