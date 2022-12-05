import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { Messages } from "../utils/messages";
import { getStoredOptions, LocalStorageOptions } from "../utils/storage";
import "./contentScript.css";

const ContentScript: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
          ;
        </Card>
      )}
    </>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<ContentScript />);
