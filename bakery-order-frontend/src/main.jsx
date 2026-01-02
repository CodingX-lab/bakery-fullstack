import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 确保引入了它
import "./index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 💡 关键：BrowserRouter 必须包裹住 App */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
