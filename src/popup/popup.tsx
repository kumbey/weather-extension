import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { fetchOpenWeatherData } from "../utils/api";
import "./popup.css";

const App: React.FC = () => {
  useEffect(() => {
    fetchOpenWeatherData("Toronto")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <img src="icon.png" alt="" />
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<App />);
