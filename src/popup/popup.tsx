import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto";
import "./popup.css";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material";
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@mui/icons-material";
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";
import { Messages } from "../utils/messages";

const App: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  const handleCityBtnClick = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteBtnClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleBtnClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleOverlayBtnClick = () => {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  return (
    <Box mx={"4px"} my={"16px"}>
      <Grid
        container
        alignItems="center"
        justifyContent={"space-between"}
        height={"50px"}
      >
        <Grid item>
          <Paper>
            <Box px={"16px"} py={"5px"}>
              <InputBase
                autoFocus
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(ev) => {
                  if (ev.keyCode == 13) {
                    handleCityBtnClick();
                  }
                }}
              />
              <IconButton onClick={handleCityBtnClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py={"4px"} width={"40px"}>
              <IconButton onClick={handleTempScaleBtnClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py={"4px"} width={"40px"}>
              <IconButton onClick={handleOverlayBtnClick}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleCityDeleteBtnClick(index)}
        />
      ))}
      <Box height={"5px"} />
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<App />);
